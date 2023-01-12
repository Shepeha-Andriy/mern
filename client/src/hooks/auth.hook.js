import { useCallback, useEffect, useState } from "react"

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem('userData', JSON.stringify({userId: id, token: jwtToken}))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)

    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'))

    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, ready }
}