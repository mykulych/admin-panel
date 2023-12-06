const models = [];

module.exports = {
  models,
  init: (sequelize) => {
    const modelDefiners = [require("./user.js")];
    for (const modelDefiner of modelDefiners) {
      models.push(modelDefiner(sequelize));
    }
  },
};
