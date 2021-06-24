import client from '@sanity/client';

export default client({
  projectId: 'dind53ik',
  dataset: 'production',
  useCdn: true,
});
export const writableClient = client({
  projectId: 'dind53ik',
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});
