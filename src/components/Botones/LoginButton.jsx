import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function LoginButton() {
  const theme = useTheme()
  const buttonColor = theme.palette.primary.light

  const { loginWithRedirect } = useAuth0()

  return <Button size='large' variant='text' sx={{ color: '#232118', ml: 2 }} onClick={() => loginWithRedirect()}>Ingresar</Button>
}

export default LoginButton
