import * as prismic from "@prismicio/client";

const endpoint = prismic.getEndpoint("ignews-yuri-paiva");

export function getPrismicClient() {
  const prismicClient = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  prismicClient.enableAutoPreviews();

  return prismicClient;
}
