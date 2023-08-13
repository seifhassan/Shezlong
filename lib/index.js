const asycnWrapper = async (promise) => {
  try {
    const data = await promise;
    return [undefined, data];
  } catch (error) {
    return [error];
  }
};

module.exports = { asycnWrapper };
