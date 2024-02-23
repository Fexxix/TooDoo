import { Schema, model } from "mongoose"

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
})

export const usersModel = model("users", usersSchema)
