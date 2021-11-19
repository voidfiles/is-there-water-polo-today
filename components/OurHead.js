import Head from "next/head";

export default function OurHead() {
  const baseURL =
    process.env.VERCEL_ENV === "production"
      ? "https://istherewaterpolo.today"
      : "";
  const twitterCard = baseURL + "/twitter_card.jpg";
  return (
    <Head>
      <title>Is there water polo today?</title>
      <meta
        property="og:title"
        content="Is there water polo today?"
        key="title"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@waterpolotoday" />
      <meta name="twitter:title" content="Is there water polo today?" />
      <meta
        name="twitter:description"
        content="A list of all the waterpolo games happening soon."
      />
      <meta name="twitter:image" content={twitterCard} />
    </Head>
  );
}
