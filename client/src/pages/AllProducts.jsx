import React from 'react'
import { useAppContext } from '../context/AppContext'

const {products} = useAppContext();

const AllProducts = () => {
  return (
    <div className='mt-16 flex flex-col'>
        <div className=''>
            <p>All Products</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
    </div>
  )
}

export default AllProducts