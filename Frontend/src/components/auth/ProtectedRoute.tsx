import { decodeToken } from "@/lib/token"
import { Navigate } from "react-router-dom"

type Props = {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const decoded = decodeToken()
  if (!decoded) return <Navigate to="/login" replace />
  return <>{children}</>
}
