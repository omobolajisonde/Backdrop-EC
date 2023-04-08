module.exports = (fn) => {
  return async (_, args) => {
    try {
      return await fn(_, args);
    } catch (error) {
      console.log(error.message);
    }
  };
};
