import { config } from "dotenv"
config()

import express from "express"
import mongoose from "mongoose"
import session from "express-session"
import { usersRouter } from "./routes/userRoutes"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(
  session({
    secret: process.env.SECRET!,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))

// routes
app.use("/api/users/", usersRouter)

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT!, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`)
    })
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message)
  })
