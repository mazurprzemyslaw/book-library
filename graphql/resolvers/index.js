const authResolver = require("./auth");
const bookResolver = require("./books");

const rootResolver = {
  ...authResolver,
  ...bookResolver
};

module.exports = rootResolver;
