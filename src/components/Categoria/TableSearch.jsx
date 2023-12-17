import * as React from 'react'
import { Box, Grid } from '@mui/material'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'

import Typography from '@mui/material/Typography'

function TableSearch({ categorias, onEdit, onDelete }) {
  const myColumns = [
    { field: 'nombre', headerName: 'Nombre Categoría', width: 500 },
    { field: 'descripcion', headerName: 'Descripción', width: 500 },
    { field: 'cantidadProductos', headerName: 'Cantidad Productos', width: 200 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 200,
      cellClassName: 'actions',
      // aca va id porque es el nombre de la columna de la tabla
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label='Edit'
          onClick={() => onEdit(id)} // Llamar a la función pasando el ID
          className='textPrimary'
          color='inherit'
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label='Delete'
          color='inherit'
          onClick={() => onDelete(id)}
        />,
      ],
    },
  ]

  if (categorias.length === 0) {
    return (
      <Box sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh',
      }}
      >
        <Typography variant='h5' sx={{ marginBottom: '20px' }}>No se han agregado categorías</Typography>
      </Box>
    )
  }
  return (

    <DataGrid
      sx={{
        maxWidth: 1,
        maxHeight: 1,
        marginBottom: 20,
        width: { xs: 0.3, md: 1 },
      }}
      initialState={{
        pagination: { paginationModel: { pageSize: 15 } },
      }}
      pageSizeOptions={[15, 20, 30]}
      rows={categorias}
      columns={myColumns}
      getRowId={(row) => row.idCategoria}
      disableDensitySelector
      disableColumnSelector
      disableColumnFilter
      components={{ Toolbar: GridToolbar }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      localeText={{
        noRowsLabel: 'No hay filas',
        footerPaginationRowsPerPage: 'Filas por página:',
        footerPaginationPage: 'Página:',
        footerTotalRows: 'Total de filas:',
        selectionFooter: (count) => `${count} filas seleccionadas`,
      }}
    />
  )
}

export default TableSearch
