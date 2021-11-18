const path = require("path");

module.exports = {
  mode: "development", // or 'production'
  entry: {
    main: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
};
