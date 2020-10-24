const bundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const pwa = require("next-pwa");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins(
  [
    [bundleAnalyzer],
    [
      pwa,
      {
        pwa: {
          dest: "public",
          //   disable: process.env.NODE_ENV === "development",
          disable: true,
          buildExcludes: [/\/images\/.*$/],
          publicExcludes: [],
        },
      },
    ],
  ],
  {
    webpack(config, { dev }) {
      // For absolute import
      config.resolve.modules.push(__dirname);

      // for dev liniting in terminal
      if (dev) {
        config.module.rules.push({
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
        });
      }

      return config;
    },
  }
);
