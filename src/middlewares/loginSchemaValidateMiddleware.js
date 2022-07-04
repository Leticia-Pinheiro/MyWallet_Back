import { loginSchema } from "../schemas/authSchema.js"

export default function loginSchemaValidateMiddleware(req, res, next) {
    const validation = loginSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.status(400).send(validation.error.details.map((err) => err.message));
    }
    next();
}	