const middlewares = require
const Joi = require('joi');

const productValidator = async (req, res, next) => {
  try {
    const productsSchema = Joi.object({
      name: Joi.string()
        .min(5)
        .required(),
      price: Joi.number()
        .min(100)
        .required(),
      specifications: Joi.array().items(Joi.string()).required(),
      imgSrc: Joi.string()
        .required(),
      inStock: Joi.boolean()
        .required(),
    });

 
    await productsSchema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    console.log(error);

    if (error.details) {
     
      const errorMessage = error.details.map(err => err.message);
      res.status(400).send({ error: errorMessage });
    } else {
      res.status(500).send('Internal server error');
    }
  }
};

module.exports = productValidator;
