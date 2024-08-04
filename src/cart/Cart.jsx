import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';
import emptyCartImage from '../assets/images/illustration-empty-cart.svg';
import carbonNeutral from '../assets/images/icon-carbon-neutral.svg';
import CartItem from './CartItem';


const Cart = ({setOrderVisible}) => {
    const {cartItems, getTotalPrice} = useCart();
    const [totalPrice, setTotalPrice] = useState(0);

    const handleOrderVisible = () => {
        setOrderVisible((prev) => !prev);
    }
    
    useEffect(() => {
        setTotalPrice(getTotalPrice());
    }, [cartItems]);

  return (
    <div className='px-5 py-10 flex flex-col items-center gap-2 bg-white sm:max-w-[400px] rounded-lg w-full h-full mt-4'>
        <span className='font-bold sm:text-2xl text-3xl text-amber-700 self-start'>Your cart ({cartItems.length})</span>
        {
            cartItems.length === 0 ? (
                <>
                <img src={emptyCartImage} alt="empty_cart" className='sm:w-[150px] w-[100px]' />
                <p className='text-amber-700 font-bold'>Your added items will appear here</p>
                </>
            ) : (
                // <p>Not empty</p>
                <>
                {
                    cartItems.map((item, index) => {
                        return <CartItem setTotalPrice={setTotalPrice} totalPrice={totalPrice}  key={index} name={item.name} price={item.price} itemCount={item.itemCount} /> 
                    })
                }

                <div className='flex flex-row justify-between items-center w-full'>
                    <span className='text-lg'>Total</span>
                    <span className='text-4xl font-bold'>${totalPrice}</span>
                </div>

                <div className='flex flex-row gap-2 items-center justify-center py-3 bg-orange-200 w-full rounded-md'>
                    <img src={carbonNeutral} className='h-5 w-5' />
                    <span className='text-normal'>This is a <span className='font-bold'>carbon-neutral</span> delivery</span>
                </div>  

                <button onClick={handleOrderVisible} className='bg-red-600 text-white w-full mt-3 h-14 py-3 rounded-full'>Confirm order</button>
                </>
            )
        }
    </div>
  )
}

export default Cart;
