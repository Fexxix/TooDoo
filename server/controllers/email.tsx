import { Html } from "@react-email/html"
import { Link } from "@react-email/link"

export function Email({ token }: { token: string }) {
  return (
    <Html lang="en">
      <h1>Verify Your email</h1>
      Click this:{" "}
      <Link href={`${process.env.FRONTEND_URL}/verify/${token}`}>Verify</Link>
      <br />
      This link will expire in an hour.
    </Html>
  )
}
