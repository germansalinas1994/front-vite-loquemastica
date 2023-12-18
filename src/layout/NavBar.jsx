import * as React from 'react';
import { useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ResponsiveAppBar from './ResponsiveAppBar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ThemeContext from './ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBasket,
  ShoppingCart,
  Favorite,
  History,
  AccountCircle,
  Help,
  Store,
  BarChart,
  Storefront,
  RateReview,
  Settings,
} from '@mui/icons-material';
import BotonCarrito from '../components/Botones/BotonCarrito';








const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));





//componente que se encarga de mostrar el menu lateral


const NavBar = ({ children }) => {


  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
    //este metodo es para cerrar el menu cuando se hace click en un item
    // handleDrawerClose();
  }

  const theme = useTheme();

  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const [open, setOpen] = React.useState(false);


  // opciones de menu del cliente, armo un arreglo con el Nombre que muestra, la url a la que redirecciona y el icono que muestra
  const clientOptions = [
    { name: 'Pedidos', route: '/orders', icon: <ShoppingBasket /> },
    { name: 'Carrito', route: '/cart', icon: <BotonCarrito/> },
    { name: 'Historial de Pedidos', route: '/order-history', icon: <History /> },
    { name: 'Mi Cuenta', route: '/account', icon: <AccountCircle /> },
    { name: 'Ayuda y Soporte', route: '/help', icon: <Help /> },
  ];

  // opciones de menu del proveedor, armo un arreglo con el Nombre que muestra, la url a la que redirecciona y el icono que muestra
  const providerOptions = [
    { name: 'Gestión de Productos', route: '/manage-products', icon: <Store /> },
    { name: 'Estadísticas de Ventas', route: '/sales-analytics', icon: <BarChart /> },
    { name: 'Inventario', route: '/inventory', icon: <Storefront /> },
    { name: 'Valoraciones', route: '/reviews', icon: <RateReview /> },
    { name: 'Ayuda y Soporte', route: '/help', icon: <Help /> },
    { name: 'Configuración', route: '/settings', icon: <Settings /> },
  ];


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
          </IconButton>
          <ResponsiveAppBar></ResponsiveAppBar>
          {/* {themeSwitch} Agrega esto al final para que se coloque al margen derecho */}
          <FormControlLabel
            control={
              <Switch
                checked={isDarkTheme}
                onChange={toggleTheme}
                icon={<Brightness7Icon />}
                checkedIcon={<Brightness4Icon />}
              />
            }
            // label={isDarkTheme}
          />
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p:3}}>
        {children}

      </Box>

    </Box>




  );
}

export default NavBar;
