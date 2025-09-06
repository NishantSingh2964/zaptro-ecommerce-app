import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUser } from '@clerk/clerk-react'

const ProtectedRoute = ({ children }) => {
  const { user } = useUser()
  const [shouldRedirect, setShouldRedirect] = React.useState(false)

  useEffect(() => {
    if (!user) {
      toast.warning("Login first to access cart 🚨", { toastId: "login-warning" })
      setShouldRedirect(true)
    }
  }, [user])

  if (shouldRedirect) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
