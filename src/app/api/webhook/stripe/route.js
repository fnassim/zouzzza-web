import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectMongo from "../../../utils/mongoClient";
import Account from "../../../models/Account";
import fazzle from "../../../fazzle.json";
import { findCheckoutSession } from "../../../api/pay/stripe/route";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2023-10-16",
  typescript: true,
});

// Get webhook secret from env
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Stripe Webhook Handler - Optimized for Next.js
 * Listens to Stripe events and updates the database accordingly.
 */
export async function POST(req) {
  try {
    await connectMongo(); // Ensure DB connection

    // Read request body as raw text (required for Stripe verification)
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature");

    let event;

    // Verify webhook authenticity
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("❌ Webhook verification failed:", err.message);
      return NextResponse.json(
        { error: "Webhook verification failed" },
        { status: 400 }
      );
    }

    // Extract event type
    const { type, data } = event;
    const stripeObject = data.object;

    console.log(`🔔 Received Stripe event: ${type}`);

    switch (type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(stripeObject);
        break;

      case "checkout.session.expired":
        console.log("⚠️ Checkout session expired:", stripeObject.id);
        break;

      case "customer.subscription.updated":
        console.log("🔄 Subscription updated:", stripeObject.id);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(stripeObject);
        break;

      case "invoice.paid":
        await handleInvoicePaid(stripeObject);
        break;

      case "invoice.payment_failed":
        console.log("❌ Invoice payment failed:", stripeObject.id);
        break;

      default:
        console.warn(`⚠️ Unhandled Stripe event: ${type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("🚨 Webhook processing error:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Handles successful checkout session completion
 */
const findPlanByPriceId = (priceId) => {
  return fazzle.pricing.pricingPlans.find(
    (p) =>
      p.priceIdMonthly === priceId ||
      p.priceIdYearly === priceId ||
      p.priceIdOneTime === priceId
  );
};

const handleCheckoutSessionCompleted = async (session) => {
  try {
    console.log("🔍 Processing checkout session completion...");
    console.log(`🛠️ Session ID: ${session.id}`);

    // Fetch session details
    const checkoutSession = await findCheckoutSession(session.id);
    console.log("✅ Checkout session retrieved successfully:", checkoutSession);

    const billingId = checkoutSession?.customer;
    const priceId = checkoutSession?.line_items?.data[0]?.price.id;
    const accountId = session.client_reference_id;

    console.log(`🔍 Extracted billingId: ${billingId}`);
    console.log(`🔍 Extracted priceId: ${priceId}`);
    console.log(`🔍 Extracted accountId: ${accountId}`);

    // Find corresponding plan
    const plan = findPlanByPriceId(priceId);
    if (!plan) {
      console.warn(
        "⚠️ No matching plan found for priceId:",
        priceId
      );
      return;
    }
    console.log(`✅ Matched Plan: ${plan.details.name}`);

    // Retrieve customer details from Stripe
    const customer = await stripe.customers.retrieve(billingId);
    console.log("✅ Stripe customer retrieved:", customer.email);

    // Check if account exists in the database
    let account;
    if (accountId) {
      console.log(`🔍 Searching account by ID: ${accountId}`);
      account = await Account.findById(accountId);
    } else {
      console.log(`🔍 Searching account by contactEmail: ${customer.email}`);
      account = await Account.findOne({ contactEmail: customer.email });
    }

    // Create a new account if not found
    if (!account) {
      console.log("⚠️ Account not found in database. Creating new account...");
      account = new Account({
        contactEmail: customer.email,
        fullName: customer.name,
      });
      await account.save();
      console.log(`✅ New account created: ${account.contactEmail}`);
    }

    // Update account subscription details
    account.billingId = billingId;
    account.priceId = priceId;
    account.isAuthorized = true;
    await account.save();
    console.log(
      `✅ Account ${account.contactEmail} subscription updated successfully`
    );

    console.log(
      `🎉✅ Account ${account.contactEmail} granted access (Plan: ${plan.details.name})`
    );
  } catch (err) {
    console.error("❌ Error processing checkout session:", err.message);
  }
};

/**
 * Handles subscription deletion (user cancels subscription)
 */
const handleSubscriptionDeleted = async (subscription) => {
  try {
    const account = await Account.findOne({ billingId: subscription.customer });

    if (!account) {
      console.warn("⚠️ No account found for canceled subscription");
      return;
    }

    account.isAuthorized = false;
    await account.save();

    console.log(`❌ Access revoked for account: ${account.contactEmail}`);
  } catch (err) {
    console.error("❌ Error processing subscription deletion:", err.message);
  }
};

/**
 * Handles successful invoice payments (subscription renewals)
 */
const handleInvoicePaid = async (invoice) => {
  try {
    const priceId = invoice.lines.data[0].price.id;
    const billingId = invoice.customer;
    const account = await Account.findOne({ billingId });

    if (!account || account.priceId !== priceId) return;

    account.isAuthorized = true;
    await account.save();

    console.log(`💰 Subscription renewed for: ${account.contactEmail}`);
  } catch (err) {
    console.error("❌ Error processing invoice payment:", err.message);
  }
};
