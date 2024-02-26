import { type Request, Response, NextFunction } from "express"

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // @ts-ignore
  if (req.session.user) {
    return next()
  }

  res.status(401).json({ message: "Not authenticated" })
}
