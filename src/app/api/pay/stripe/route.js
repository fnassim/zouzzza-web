import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authHandler } from "../../auth/[...nextauth]/route";
import Stripe from "stripe";
import connectMongo from "../../../utils/mongoClient";
import Account from "../../../models/Account";

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  typescript: true,
});

/**
 * Validates the request body parameters for a checkout session
 */
const validateRequest = ({ priceId, mode, successUrl, cancelUrl }) => {
  if (!priceId) return "priceId is required.";
  if (!mode) return "Payment mode is required ('payment' or 'subscription').";
  if (!successUrl || !cancelUrl) return "Success and cancel URLs are required.";
  return null;
};

/**
 * Creates a Stripe checkout session (One-time payment or subscription)
 */
const createCheckoutSession = async ({ account, priceId, mode, successUrl, cancelUrl, couponId }) => {
  try {
    const stripeParams = {};

    // Prefill customer details if account is authenticated
    if (account?.billingId) {
      stripeParams.customer = account.billingId;
    } else {
      stripeParams.customer_creation = "always";
      stripeParams.payment_intent_data = { setup_future_usage: "on_session" };
      stripeParams.tax_id_collection = { enabled: true };
      if (account?.contactEmail) stripeParams.customer_email = account.contactEmail;
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode,
      allow_promotion_codes: true,
      client_reference_id: account?._id?.toString(),
      line_items: [{ price: priceId, quantity: 1 }],
      discounts: couponId ? [{ coupon: couponId }] : [],
      success_url: successUrl,
      cancel_url: cancelUrl,
      ...stripeParams,
    });

    return stripeSession.url;
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    throw new Error("Failed to create Stripe Checkout session.");
  }
};

/**
 * API Route to handle POST request for Stripe Checkout
 */
export const POST = async (req) => {
  try {
    const requestBody = await req.json();

    // Validate request
    const error = validateRequest(requestBody);
    if (error) return NextResponse.json({ error }, { status: 400 });

    // Connect to MongoDB
    await connectMongo();

    // Get authenticated account
    const session = await getServerSession(authHandler);
    const account = session?.account?.id ? await Account.findById(session.account.id) : null;

    // Generate checkout session URL
    const checkoutUrl = await createCheckoutSession({ account, ...requestBody });

    return NextResponse.json({ url: checkoutUrl });
  } catch (err) {
    console.error("Payment Session Error:", err);
    return NextResponse.json({ error: err.message || "An unexpected error occurred" }, { status: 500 });
  }
};

/**
 * Creates a Stripe customer portal session for managing subscriptions
 */
export const createCustomerPortal = async ({ billingId, returnUrl }) => {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: billingId,
      return_url: returnUrl,
    });

    return portalSession.url;
  } catch (error) {
    console.error("Customer Portal Error:", error);
    throw new Error("Failed to create Customer Portal session.");
  }
};

/**
 * Retrieves a Stripe checkout session by ID to fetch subscription details
 */
export const findCheckoutSession = async (sessionId) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    return session;
  } catch (error) {
    console.error("Find Checkout Session Error:", error);
    return null;
  }
};
