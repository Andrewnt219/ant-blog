import client from "@sanity/client";

export default client({
  projectId: "3c8xizwy",
  dataset: "production",
  useCdn: true,
});
