

function getStoreValidationError({ language }) {
  if (!language) {
  
    return {
      error: {
        message: `language must be selected`,
      },
    };
  }
}

module.exports = getStoreValidationError;
