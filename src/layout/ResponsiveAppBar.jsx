import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import PinterestIcon from '@mui/icons-material/Pinterest';
import BotonCarrito from '../components/Botones/BotonCarrito';
import LoginButton from '../components/Botones/LoginButton';
import { useAuth0 } from "@auth0/auth0-react";



// Declaro un array de objetos con las propiedades id, name y route. 
// Luego, en el componente ResponsiveAppBar, itero sobre ese array y muestro los elementos en el menú de navegación.
//  El componente ResponsiveAppBar es el siguiente:
const pagesNav = [
  { id: 1, name: 'Productos', route: '/productos' },
  { id: 2, name: 'Categorias', route: '/categorias' },
  { id: 3, name: 'Blog', route: '/blog' }
]

const settings = [
  { id: 1, name: 'Pedidos', route: '/pedidos' },
  { id: 2, name: 'Direcciones', route: '/direcciones' },
  { id: 3, name: 'Favoritos', route: '/favoritos' },
  { id: 4, name: 'Cuenta', route: '/cuenta' },
  { id: 5, name: 'Salir', route: '/logout' }
]



// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {


  const { isAuthenticated } = useAuth0();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>



        {/* Aca esta el logo */}
        <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
          <PinterestIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        </Link>

        {/* esto es el texto del logo */}
        {/* el boton me tiene que llevar a la pagina de inicio */}
        <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>

          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ECommerce
          </Typography>
        </Link>


        {/* este box es para el menu de navegacion si esta la pantalla contraida */}

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            color="inherit"
          >
            <Link to={'/home'} style={{ color: 'inherit', textDecoration: 'none' }}>

              <PinterestIcon sx={{ flexGrow: 1, display: { xs: 'flex' }, mr: 1 }} />
            </Link>
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >



            <Typography sx={{ flexGrow: 1, display: { xs: 'flex' }, mr: 1 }}>
              Menu
            </Typography>
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pagesNav.map((page) => (
              <MenuItem
                key={page.id}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.route.toLowerCase()}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>

            ))}
          </Menu>

        </Box>

        {/* este box es para el menu de navegacion si esta la pantalla expandida */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pagesNav.map((page) => (
            <Link key={page.id} to={page.route.toLowerCase()} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            </Link>))}
        </Box>




        {/* Este box es para el boton de login o para info del usuario */}


        <Box sx={{ flexGrow: 0 }}>
          <Link to={'/cart'} style={{ color: 'inherit', textDecoration: 'none' }}>
            <IconButton >
              <BotonCarrito />
            </IconButton>
          </Link>



            {isAuthenticated ?
              (
                <Tooltip title="Abrir opciones">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml:3 }}>
                    {/* en el src del avatar va la imagen del usuario, por ahora es una imagen de prueba, despues va a ser la imagen del usuario logueado */}
                    <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              )
              :
              (
                  <LoginButton/>
              )
            }



          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting.id}
                onClick={handleCloseUserMenu}
                component={Link}
                to={setting.route.toLowerCase()}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Typography textAlign="center">{setting.name}</Typography>
              </MenuItem>


            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container >
  );
}
export default ResponsiveAppBar;
