type TokenPayload = {
  id: number
  email: string
  exp: number
}

export const decodeToken = (): TokenPayload | null => {
  const token = localStorage.getItem("token")
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split(".")[1])) as TokenPayload
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token")
      return null
    }
    return payload
  } catch {
    localStorage.removeItem("token")
    return null
  }
}
