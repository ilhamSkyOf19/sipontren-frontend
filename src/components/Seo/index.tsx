import { Helmet } from "react-helmet-async";

type SeoProps = {
  title: string;
  description: string;
  keywords: string;
  path: string;
  schema?: object;
};

export default function Seo({
  title,
  description,
  keywords,
  path,
  schema,
}: SeoProps) {
  // schema default untuk pesantren
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Pondok Pesantren Muhammadiyah Al-Amin",
    alternateName: "Ponpes Al-Amin Seputih Banyak",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Seputih Banyak",
      addressRegion: "Lampung Tengah",
      addressCountry: "ID",
    },
  };

  const finalSchema = schema ?? defaultSchema;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* OpenGraph biar bagus saat dishare */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:url" content={`https://domain-kamu.com${path}`} /> */}

      <script type="application/ld+json">{JSON.stringify(finalSchema)}</script>
    </Helmet>
  );
}
