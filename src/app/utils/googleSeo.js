import fazzle from "../fazzle.json";

// Function to generate SEO metadata
export const generateSEOMetadata = ({
  pageTitle,
  pageDescription,
  pageKeywords,
  openGraphData,
  canonicalPath,
  additionalMetaTags,
} = {}) => {
  const defaultTitle = appConfig.appName;
  const defaultDescription = appConfig.appDescription;
  const baseDomain =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : `https://${appConfig.domainName}/`;

  return {
    title: pageTitle || defaultTitle,
    description: pageDescription || defaultDescription,
    keywords: pageKeywords || [defaultTitle],
    applicationName: defaultTitle,
    metadataBase: new URL(baseDomain),
    openGraph: {
      title: openGraphData?.title || defaultTitle,
      description: openGraphData?.description || defaultDescription,
      url: openGraphData?.url || baseDomain,
      siteName: openGraphData?.title || defaultTitle,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: openGraphData?.title || defaultTitle,
      description: openGraphData?.description || defaultDescription,
      card: "summary_large_image",
      creator: "@your_twitter_handle",
    },
    ...(canonicalPath && {
      alternates: { canonical: canonicalPath },
    }),
    ...additionalMetaTags,
  };
};

// Function to render structured data for rich snippets
export const renderStructuredData = () => {
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "SoftwareApplication",
    name: fazzle.productName,
    description: fazzle.hero.heroDescription,
    image: `${baseDomain}logo.svg`,
    url: baseDomain,
    author: {
      "@type": "Person",
      name: "Author Name",
    },
    datePublished: "2025-01-01",
    applicationCategory: "EducationalApplication",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "12",
    },
    offers: [
      {
        "@type": "Offer",
        price: "9.00",
        priceCurrency: "USD",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    ></script>
  );
};
