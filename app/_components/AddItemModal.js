'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false })
const Stack = dynamic(() => import('@mui/material/Stack'), { ssr: false })
const Typography = dynamic(() => import('@mui/material/Typography'), { ssr: false })
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false })
const Modal = dynamic(() => import('@mui/material/Modal'), { ssr: false })
const TextField = dynamic(() => import('@mui/material/TextField'), { ssr: false })

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

const AddItemModal = ({ open, handleClose, addItem }) => {
  const [itemName, setItemName] = useState('')

  const handleAddItem = () => {
    addItem(itemName)
    setItemName('')
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Item
        </Typography>
        <Stack width="100%" direction={'row'} spacing={2}>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button variant="outlined" onClick={handleAddItem}>
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default AddItemModal