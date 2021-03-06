const path = require("path");

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      include: path.resolve(__dirname, ".."),
      use: ["style-loader", "css-loader", "resolve-url-loader", "sass-loader"],
    });
    return config;
  }
}