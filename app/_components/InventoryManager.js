'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false })
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false })
const InventoryList = dynamic(() => import('./InventoryList'), { ssr: false })
const AddItemModal = dynamic(() => import('./AddItemModal'), { ssr: false })

const InventoryManager = () => {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)

  const updateInventory = async () => {
    const res = await fetch('/api/inventory')
    const data = await res.json()
    setInventory(data)
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const addItem = async (item) => {
    await fetch('/api/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemName: item }),
    })
    await updateInventory()
  }

  const removeItem = async (item) => {
    await fetch('/api/inventory', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemName: item }),
    })
    await updateInventory()
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <AddItemModal open={open} handleClose={handleClose} addItem={addItem} />
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <InventoryList inventory={inventory} removeItem={removeItem} />
    </Box>
  )
}

export default InventoryManager