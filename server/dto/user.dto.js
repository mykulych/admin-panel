const properties = {
  name: { type: "string" },
  surname: { type: "string" },
  number_phone: { type: "string" },
  country: { type: "string" },
  height: { type: "integer" },
  weight: { type: "integer" },
};

const requiredFields = [
  "name",
  "surname",
  "number_phone",
  "country",
  "height",
  "weight",
];

const dto = {
  type: "object",
  properties,
  additionalProperties: false,
};

module.exports = {
  updateUserDto: { ...dto },
  createUserDto: {
    ...dto,
    required: requiredFields,
  },
};
