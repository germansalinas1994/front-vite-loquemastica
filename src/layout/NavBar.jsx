
import { useEffect, useState } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
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
import { Card, Grid, Typography } from '@mui/material';
import ThemeContext from './ThemeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PetsIcon from '@mui/icons-material/Pets'; // Importa los íconos que necesitas
import ToysIcon from '@mui/icons-material/Toys';
import KingBedIcon from '@mui/icons-material/KingBed';
import { CategoriaContext } from '../components/CategoriaContext';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';



const drawerWidth = 260;




const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh', // Alto mínimo para ocupar toda la altura de la pantalla

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);




//componente que se encarga de mostrar el menu lateral


const NavBar = ({ children }) => {

  const apiLocalKey = import.meta.env.VITE_APP_API_KEY
  const { categoriaSeleccionada, setCategoriaSeleccionada } = useContext(CategoriaContext);
  const [categoriasExpandidas, setCategoriasExpandidas] = useState([]);



  const navigate = useNavigate();

  const theme = useTheme();

  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const location = useLocation();
  const [open, setOpen] = useState(true);



  const iconMap = {
    'Alimentos': PetsIcon,
    'Juguetes': ToysIcon,
    'Accesorios': KingBedIcon,
    // ... puedes agregar más categorías e íconos aquí
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (location.pathname != '/productos' && location.pathname != '/') {
      setCategoriaSeleccionada(null);
      setOpen(false);
    }
    fetchCategorias();

    // else {
    //   setOpen(true);
    // }

  }, [location.pathname]);


  const [categorias, setCategorias] = useState([]);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get(apiLocalKey + '/categorias');
      setCategorias(response.data.result.data);
      const categoriasTransformadas = transformarCategoriasEnArbol(response.data.result.data);
      setCategorias(categoriasTransformadas);
    } catch (error) {
      console.log(error);
    }
  }


  const filtrarCategoria = (idCategoria) => {

    if(idCategoria === categoriaSeleccionada){
      setCategoriaSeleccionada(null);
      navigate('/productos');
      return;
    }
    setCategoriaSeleccionada(idCategoria);

  }

  const transformarCategoriasEnArbol = (categorias) => {
    let arbolCategorias = [];
    let actualAgrupador = null;

    categorias.forEach(categoria => {
      if (categoria.agrupador) {
        // Si es un agrupador, lo agregamos al árbol y lo hacemos el actual agrupador
        actualAgrupador = { ...categoria, subcategorias: [] };
        arbolCategorias.push(actualAgrupador);
      } else if (actualAgrupador) {
        // Si no es un agrupador y hay un agrupador actual, agregamos la categoría a las subcategorías del agrupador actual
        actualAgrupador.subcategorias.push(categoria);
      }
    });

    return arbolCategorias;
  };



  const toggleCategoria = (idCategoria) => {
    setOpen(true);
    setCategoriasExpandidas(prev =>
      prev.includes(idCategoria)
        ? prev.filter(id => id !== idCategoria)
        : [...prev, idCategoria]
    );
  };

  const renderizarCategorias = (categoria) => {

    const esAgrupador = categoria.agrupador;
    const IconoCategoria = iconMap[categoria.nombre] || PetsIcon;
    const esCategoriaSeleccionada = categoria.idCategoria === categoriaSeleccionada;
    return (
      <React.Fragment key={categoria.idCategoria}>
        <ListItemButton
          sx={{
            mt: 3,
          }}
          onClick={() => esAgrupador ? toggleCategoria(categoria.idCategoria) : filtrarCategoria(categoria.idCategoria)}>
          <ListItemIcon>
            <IconoCategoria />
          </ListItemIcon>
          <ListItemText primary={categoria.nombre} />
          {esAgrupador && (categoriasExpandidas.includes(categoria.idCategoria) ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </ListItemButton>
        {esAgrupador && categoriasExpandidas.includes(categoria.idCategoria) && (
          <Collapse in={open}>
            {categoria.subcategorias.map(subcategoria => (
              <ListItemButton
                key={subcategoria.idCategoria}
                sx={{
                  bgcolor: subcategoria.idCategoria === categoriaSeleccionada ? 'primary.light' : 'inherit',
                  mb:1
                }}
                onClick={() => filtrarCategoria(subcategoria.idCategoria)}
              >
                <ListItemText
                  primary={subcategoria.nombre}
                  sx={{
                    ml:6,
                    // fontWeight: 'bold', // Opcional: hacer el texto en negrita
                    fontSize: 14,
                    // Puedes ajustar la tipografía como prefieras aquí
                  }}
                />
              </ListItemButton>
            ))}
          </Collapse>
        )}
      </React.Fragment>
    );
  };




  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#FACA05' }}>
        <Toolbar>
          {
            (location.pathname === '/' || location.pathname === '/productos') && (
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
                <MenuIcon />
              </IconButton>
            )


          }
          <ResponsiveAppBar></ResponsiveAppBar>
        </Toolbar>
      </AppBar>


      {
        (location.pathname === '/' || location.pathname === '/productos') && (
          <Drawer variant="permanent" open={open}>

            <DrawerHeader>
              <Typography variant="h6" sx={{ fontWeight: 'bold', justifyContent: 'center', mb: 1, mr: 5 }}>
                Categorías
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                {/* el theme direction es para que el icono de la flecha cambie de lado cuando se abre el menu */}
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>


            </DrawerHeader>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'top', // Centra los elementos verticalmente
                mt: 2,
                height: '100%', // Ocupa todo el alto disponible
              }}
            >

              <List>
                {categorias.map(categoria => renderizarCategorias(categoria))}
              </List>
            </Box>

          </Drawer>
        )

      }

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* {!isLoading && ( */}
        <Card sx={{
          backgroundColor: isDarkTheme ? '#000000' : '#F5F5F5',
          borderRadius: 2,
          padding: '20px 10px',
          display: 'flex',
          flexDirection: 'column', // Asegura que los hijos se apilen verticalmente
          flexGrow: 1, // Permite que la Card se expanda
          minHeight: '80vh', // Evita que la Card se colapse
        }}>
          <Grid spacing={2} justifyContent="center" sx={{ flexGrow: 1, maxWidth: 1, mb: 10 }}>
            {children}
          </Grid>
        </Card>

        {/* )} */}

      </Box>

    </Box>




  );
}

export default NavBar;
