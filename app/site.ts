export const SITE_URL = "https://www.suleymangulter.com";
export const SITE_NAME = "Süleyman Gülter";
export const SITE_TITLE = "Süleyman Gülter | Software Engineer";
export const SITE_DESCRIPTION =
  "Süleyman Gülter - Software Engineer. Node.js, .NET ve mikroservis odaklı projeler, deneyim ve iletişim.";
export const OG_IMAGE = `${SITE_URL}/logo-wordmark.png`;
export const EMAIL = "suleymangulter2@gmail.com";
export const GITHUB_URL = "https://github.com/suleymanngulter/";
export const LINKEDIN_URL = "https://www.linkedin.com/in/suleymanngulter/";

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: ["tr", "en"],
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      jobTitle: "Software Engineer",
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "İstanbul",
        addressRegion: "Kocaeli",
        addressCountry: "TR",
      },
      sameAs: [GITHUB_URL, LINKEDIN_URL],
    },
  ],
};
