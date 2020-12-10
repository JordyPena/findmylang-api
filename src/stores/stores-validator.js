const logger = require("../logger");

function getStoreValidationError({ language }) {
  if (!language) {
    logger.error(`${language} must be selected`);
    return {
      error: {
        message: `language must be selected`,
      },
    };
  }
}

module.exports = getStoreValidationError;
