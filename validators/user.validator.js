const Joi = require("joi")

const userValidator = async (req, res, next) => {
    try {
        const userSchema = Joi.object({
            firstName: Joi.string()
                .min(1)
                .required(),
            lastName: Joi.string()
                .min(1)
                .required(),
            email: Joi.string()
                .email(),
            mobileNo: Joi.number()
                .required(),
            password: Joi.string()
                .min(8)
                .required(),
        })
        await userSchema.validateAsync(req.body)
        next();
    } catch (error) {
        const errorMessages = []
        if (error.details) {
            error.details.forEach(obj => {
                errorMessages.push(obj.message)
            })
            res.status(400);
            res.send({
                error: errorMessages
            })
        } else {
            res.status(500)
            res.send(error)
        }
    }
}

module.exports = userValidator