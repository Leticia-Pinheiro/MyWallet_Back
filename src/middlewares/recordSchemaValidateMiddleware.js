import { recordSchema } from "../schemas/recordSchema.js"

export default async function recordSchemaValidateMiddleware(req, res, next) {
    const validation = recordSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.status(400).send(validation.error.details.map((err) => err.message));
    }
    next();
}