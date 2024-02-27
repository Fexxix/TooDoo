import type { SessionData } from "express-session"
import type { ObjectId, Document } from "mongoose"

declare module "express-session" {
  interface SessionData extends SessionData {
    user?:
      | (Document<
          unknown,
          {},
          {
            email: string
            name: string
            password: string
            verified: boolean
          }
        > & {
          email: string
          name: string
          password: string
          verified: boolean
        } & {
          _id: Types.ObjectId
        })
      | null
  }
}
