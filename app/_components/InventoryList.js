'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false })
const Stack = dynamic(() => import('@mui/material/Stack'), { ssr: false })
const Typography = dynamic(() => import('@mui/material/Typography'), { ssr: false })
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false })

const InventoryList = ({ inventory, removeItem }) => {
  return (
    <Box border={'1px solid #333'}>
      <Box
        width="800px"
        height="100px"
        bgcolor={'#ADD8E6'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
          Inventory Items
        </Typography>
      </Box>
      <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
        {inventory.map(({ name, quantity }) => (
          <Box
            key={name}
            width="100%"
            minHeight="150px"
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            bgcolor={'#f0f0f0'}
            paddingX={5}
          >
            <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
              Quantity: {quantity}
            </Typography>
            <Button variant="contained" onClick={() => removeItem(name)}>
              Remove
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default InventoryList