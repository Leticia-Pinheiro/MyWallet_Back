import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import recordsRoutes from "./routes/recordsRoutes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(json())

app.use(authRoutes)
app.use(recordsRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log('Servidor conectado'));











