import React, { useEffect } from 'react'
import { useCart } from './CartContext'
import removeFromCartIcon from '../assets/images/icon-remove-item.svg';

const CartItem = ({name, price, itemCount, totalPrice, setTotalPrice, image, orderConf}) => {
    const {cartItems, addToCart, removeFromCart, getItemCount, getTotalPrice, setItemTotalPrice} = useCart();

    const itemTotalPrice = price * itemCount;

    // useEffect(() => {
    //     setItemTotalPrice({name: name}, itemTotalPrice);
    // }), [];

  return (
    itemCount > 0 && (
        <div className='flex flex-row justify-between gap-4 py-4 border-b border-gray-300 w-full items-center'>
        <div className={`${orderConf ? `hidden` : ``} flex flex-col gap-1 justify-center `}>
            <span className='font-semibold'>{name}</span>
            <div className={`flex flex-row gap-2`}>
                <span className='font-bold text-amber-700'>{itemCount}x</span>
                <span className='text-gray-500'>@${price.toFixed(2)}</span>
                <span className='text-gray-500 font-bold'>${itemTotalPrice.toFixed(2)}</span>
            </div>
        </div>

        <div className={`${orderConf ? `` : `hidden`} flex flex-row gap-2 justify-between items-center w-full`}>
            <div className='flex flex-row gap-2 items-center'>
              <img src={image} className='w-12 h-12 rounded-lg'></img>
              <div className='flex flex-col gap-2'>
                <span className='font-semibold'>{name}</span>
                <div className={`flex flex-row gap-4`}>
                  <span className='font-bold text-amber-700'>{itemCount}x</span>
                  <span className='text-gray-500'>@${price.toFixed(2)}</span>
                </div>
              
                </div>
            </div>
            <span className='text-black font-bold'>${itemTotalPrice.toFixed(2)}</span>
         </div>

        <img src={removeFromCartIcon} className={` ${orderConf ? `hidden` : ``} h-5 w-5 `}></img>
    </div>
    )
  )
}

export default CartItem
