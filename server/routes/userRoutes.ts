import { compare, genSalt, hash } from "bcrypt"
import { Router, type Request } from "express"
import { usersModel } from "../models/usersModel"
import { tokenModel } from "../models/tokenModel"
import { sendVerificationEmail } from "../controllers/sendEmail"
import crypto from "crypto"

interface SignUpRequest extends Request {
  body: {
    email: string
    password: string
    username: string
  }
}

const usersRouter = Router()

usersRouter.post("/signup", async (req: SignUpRequest, res) => {
  const { username, email, password } = req.body

  const exists = await usersModel.findOne({ email })

  if (exists && !exists.verified) {
    await exists.deleteOne()

    return res.status(400).json({
      message: "Email already in use but not verified! Submit again to verify.",
    })
  }

  if (exists) {
    return res.status(400).json({ message: "Email already in use!" })
  }

  const salt = await genSalt(10)
  const hashedPassword = await hash(password, salt)

  const user = new usersModel({
    email,
    username,
    password: hashedPassword,
  })

  try {
    await user.save()
  } catch {
    return res.status(500).json({ message: "Error while creating user!" })
  }

  const tokenDoc = new tokenModel({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  })

  try {
    await tokenDoc.save()
  } catch {
    return res.status(500).json({ message: "Error while creating token!" })
  }

  try {
    await sendVerificationEmail({ email, token: tokenDoc.token })
    res
      .status(200)
      .json({ message: "Signup successful! Verification email sent!" })
  } catch {
    return res.status(500).json({ message: "Error while sending email!" })
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

  if (!user.verified) {
    return res.status(400).json({
      message: "Email not verified! Please verify your email first.",
    })
  }

  // @ts-ignore
  req.session.user = user

  res.status(200).json(user)
})

usersRouter.post("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token

    const tokenDoc = await tokenModel.findOne({ token })

    if (!tokenDoc) {
      return res.status(400).json({ message: "Invalid or expired token!" })
    }

    const user = await usersModel.findById(tokenDoc.userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.verified = true
    await user.save()
    await tokenDoc.deleteOne()

    res.status(200).json({ message: "Email verified successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

export { usersRouter }
