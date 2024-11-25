const { validationResult } = require("express-validator");

module.exports = (validations) => {
  return async (req, res, next) => {
    await Promise.all(
      validations.map((validation) => validation.run(req, res))
    );

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    const messages = errors?.array()?.map((err) => err.msg);

    res.status(400).json({
      code: "404",
      messages,
    });
  };
};
