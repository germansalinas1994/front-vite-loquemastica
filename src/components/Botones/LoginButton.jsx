import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { useTheme } from '@mui/material/styles';



const LoginButton = () => {
  const theme = useTheme();
  const buttonColor = theme.palette.primary.light;


  const { loginWithRedirect } = useAuth0();

  return <Button size="large" variant='text' sx={{color:'black', ml:2 }} onClick={() => loginWithRedirect()}>Ingresar</Button>;
};

export default LoginButton;