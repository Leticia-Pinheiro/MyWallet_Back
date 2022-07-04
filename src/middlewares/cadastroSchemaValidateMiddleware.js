import { cadastroSchema } from "../schemas/authSchema.js"

export default function cadastroSchemaValidateMiddleware(req, res, next) {
    const validation = cadastroSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.status(400).send(validation.error.details.map((err) => err.message));
    }
    next();
}	