import { compare, hash } from "bcrypt"
import { Router } from "express"
import { usersModel } from "../models/usersModel"

const usersRouter = Router()

usersRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body

  const exists = await usersModel.findOne({ email })

  if (exists) {
    return res.status(400).json({ message: "Email already in use!" })
  }

  const hashedPassword = await hash(password, 10)

  try {
    const user = await usersModel.create({
      username,
      email,
      password: hashedPassword,
    })
    res.status(200).json(user)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
})

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await usersModel.findOne({ email })

  if (!user) {
    return res.status(400).json({ message: "User does not exist!" })
  }

  const matches = await compare(password, user.password)

  if (!matches) {
    return res.status(400).json({ message: "Incorrect Password!" })
  }

  // @ts-ignore
  req.session.user = user

  res.status(200).json(user)
})

export { usersRouter }
