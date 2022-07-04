import { getRecords, postRecord } from "../controllers/recordsController.js"
import { Router } from "express"
import recordSchemaValidateMiddleware from "../middlewares/recordSchemaValidateMiddleware.js"
import tokenValidateMiddleware from "../middlewares/tokenValidateMiddleware.js"

const router = Router()

router.get("/records", tokenValidateMiddleware ,getRecords)
router.post("/record", recordSchemaValidateMiddleware ,postRecord)

export default router