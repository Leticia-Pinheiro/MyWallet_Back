import { cadastrar , logar } from "../controllers/authController.js"
import { Router } from "express"
import cadastroSchemaValidateMiddleware from "../middlewares/cadastroSchemaValidateMiddleware.js"
import loginSchemaValidateMiddleware from "../middlewares/loginSchemaValidateMiddleware.js"

const router = Router()

router.post('/sign-up', cadastrar)
router.post('/sign-in', loginSchemaValidateMiddleware ,logar)

export default router