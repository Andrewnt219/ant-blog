export default {
  type: "document",
  name: "...",
  title: "...",
  fields: [
    {
      name: "seo",
      title: "SEO",
      type: "seo-tools", // use seo-tools type
      options: {
        baseUrl: "https://rosedang.vercel.app/", // (REQUIRED) This is the baseUrl for your site
        // baseUrl(doc) {
        //   return "https://.../"; // for dynamic baseUrls
        // },
        slug(doc) {
          // (REQUIRED) a function to return the sug of the current page, which will be appended to the baseUrl
          return doc.slug.current;
        },
        fetchRemote: true, // Can be set to false to disable fetching the remote source (you will need to pass the content helpers for analysis)
        content(doc) {
          return "simple html representation of your doc"; // (OPTIONAL) If your site is generated after Sanity content updates you can use this for better real time feedback
        },
        title(doc) {
          return "page title"; // (OPTIONAL) return page title otherwise inferred from scrape
        },
        description(doc) {
          return "page description"; // (OPTIONAL) return page description otherwise inferred from scrape
        },
        locale(doc) {
          return "page locale"; // (OPTIONAL) return page locale otherwise inferred from scrape
        },
        contentSelector: "body", // (OPTIONAL) option to finetune where Yoast will look for the content. (only applicable for scraping without content function)
      },
    },
  ],
};
