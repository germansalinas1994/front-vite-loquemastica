import * as React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Select from '@mui/material/Select'
import { useState, useEffect, useContext } from 'react'
import LoginButton from '../components/Botones/LoginButton'
import BotonCarrito from '../components/Botones/BotonCarrito'
import Titulo from '../../public/Titulo.png'
import { SucursalContext } from '../components/User/SucursalContext'

const pagesNav = [
  { id: 1, name: 'Productos', route: '/productos' },
  { id: 2, name: 'Categorias', route: '/categorias' },
  { id: 3, name: 'Blog', route: '/prueba' },
]

const settings = [
  { id: 1, name: 'Pedidos', route: '/pedidos' },
  { id: 2, name: 'Direcciones', route: '/direcciones' },
  { id: 3, name: 'Favoritos', route: '/favoritos' },
  { id: 4, name: 'Cuenta', route: '/cuenta' },
  { id: 5, name: 'Salir', route: '/logout' },
]

function ResponsiveAppBar() {
  const { user, isAuthenticated } = useAuth0()
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const {
    sucursales, sucursalSeleccionada, setSucursalSeleccionada, handleChangeSucursal,
  } = useContext(SucursalContext)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Container maxWidth='xl'>
      <Toolbar disableGutters>
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <img
            src={Titulo}
            alt='Logo'
            style={{
              height: '50px',
              width: 'auto',
              display: 'block',
            }}
          />
        </Link>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton size='large' color='inherit'>
            <Link to='/home' style={{ color: 'inherit', textDecoration: 'none' }}>
              <MenuIcon />
            </Link>
          </IconButton>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <Typography sx={{ flexGrow: 1, display: { xs: 'flex' }, mr: 1 }}>
              Menu
            </Typography>
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
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
                sx={{ color: '#1f0f0f', textDecoration: 'none' }}
              >
                <Typography textAlign='center'>{page.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pagesNav.map((page) => (
            <Link key={page.id} to={page.route.toLowerCase()} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button
                sx={{
                  my: 2, color: 'black', display: 'block', ml: 2,
                }}
              >
                {page.name}
              </Button>
            </Link>
          ))}
          <IconButton>
            <LocationOnIcon />
            <Select
              value={sucursalSeleccionada}
              onChange={(e) => handleChangeSucursal(e.target.value)}
              sx={{
                '.MuiSelect-select': {
                  color: 'black',
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  '&:focus': {
                    background: 'transparent',
                  },
                  '&:hover': {
                    background: 'transparent',
                  },
                },
                '.MuiSvgIcon-root': {
                  color: 'primary.main',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            >
              {sucursales.map((sucursal) => (
                <MenuItem key={sucursal.idSucursal} value={sucursal.idSucursal}>
                  {sucursal.nombre}
                </MenuItem>
              ))}
            </Select>
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Link to='/cart' style={{ color: 'inherit', textDecoration: 'none' }}>
            <IconButton>
              <BotonCarrito />
            </IconButton>
          </Link>
          {isAuthenticated ? (
            <Tooltip title='Abrir opciones'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 3 }}>
                <Avatar alt='Remy Sharp' src={user.picture} />
              </IconButton>
            </Tooltip>
          ) : (
            <LoginButton />
          )}
          <Menu
            sx={{ mt: '45px', width: '200px' }}
            id='menu-appbar'
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
            <Typography textAlign='center' sx={{ fontWeight: 'bold' }}>
              <>
                ¡Hola
                {' '}
                {user?.name}
                !
              </>
            </Typography>
            <Typography textAlign='center' sx={{ fontWeight: 'light' }}>
              {user?.email}
            </Typography>
            {settings.map((setting) => (
              <MenuItem
                key={setting.id}
                onClick={handleCloseUserMenu}
                component={Link}
                to={setting.route.toLowerCase()}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Typography textAlign='center'>{setting.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  )
}

export default ResponsiveAppBar
