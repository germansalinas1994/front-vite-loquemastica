import { Button } from '@mui/material'
import PlusIcon from '@mui/icons-material/Add'

function BotonAgregar({ onClick }) {
  return (
    <Button
      onClick={onClick}
      variant='contained'
      color='secondary'
      sx={{
        borderRadius: '10px',
        float: { xs: 'none', md: 'right' }, // Agrega float a la derecha en pantallas medianas y grandes, elimina en pantallas pequeñas
        marginBottom: '15px',
        fontSize: '1.0em',
        minWidth: '40px',
        height: '40px',
      }}
    >
      <PlusIcon />

      Nuevo
    </Button>
  )
}

export default BotonAgregar
