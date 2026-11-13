import { SITE_CONFIG } from "@/config/site";

export function buildLandingStructuredData() {
  const organizationId = `${SITE_CONFIG.foundationUrl}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_CONFIG.name,
        legalName: SITE_CONFIG.legalName,
        url: SITE_CONFIG.foundationUrl,
        logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo.blue}`,
        email: SITE_CONFIG.contact.email,
        sameAs: [SITE_CONFIG.contact.instagramUrl],
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE_CONFIG.contact.address.lines.join(" "),
          addressCountry: "ID",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        name: SITE_CONFIG.programFullName,
        url: SITE_CONFIG.url,
        description: SITE_CONFIG.description,
        inLanguage: "id-ID",
        publisher: { "@id": organizationId },
      },
    ],
  };
}
