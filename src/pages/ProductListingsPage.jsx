import React, { useState } from 'react'
import ItemListing from '../components/ItemListing';
import data from '../../data.json';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import emptyCartImage from '../assets/images/illustration-empty-cart.svg';
import Cart from '../cart/Cart';
import OrderConfirmed from '../components/OrderConfirmed';



const ProductListingsPage = () => {
    const [orderVisible, setOrderVisible] = useState(false);
  return (
    <div className='w-full h-full sm:px-24 px-8 sm:flex flex-row gap-20 bg-orange-50 py-32 relative'>
        
        <div className='flex flex-col gap-12'>
            <h1 className='text-4xl font-bold'>Desserts</h1>
            <div className='md:grid md:min-w-[400px] flex flex-col grid-cols-3 grid-flow-row gap-10 items-center justify-center'>
                {
                    data.map((item, index) => {
                        return <ItemListing key={index} image={item.image} name={item.name} category={item.category} price={item.price} />
                    })
                }
            </div>
        </div>

        <Cart setOrderVisible = {setOrderVisible}/>
        
        <OrderConfirmed visible={orderVisible} />
        
    </div>
  )
}

export default ProductListingsPage
