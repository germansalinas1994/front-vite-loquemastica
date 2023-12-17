import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'

function PositionedSnackbar({
  message, open, handleClose, vertical = 'top', horizontal = 'right',
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      key={vertical + horizontal}
      sx={{ marginTop: '40px' }}
    >
      <Alert onClose={handleClose} severity='error' variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default PositionedSnackbar
