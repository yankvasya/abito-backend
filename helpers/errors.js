const getErrorFields = (error) => {
  let errors = {};
  for (let field in error.errors) {
    errors[field] = error.errors[field].message;
  }
  return errors;
};

const required = [true, `Поле является обязательным`];

module.exports = {
  getErrorFields,
  required,
};
