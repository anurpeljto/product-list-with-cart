import React from 'react'
import orderConfirmed from '../assets/images/icon-order-confirmed.svg';
import Cart from '../cart/Cart';
import { useCart } from '../cart/CartContext';
import CartItem from '../cart/CartItem';

const OrderConfirmed = ({visible}) => {
  const {cartItems, getTotalPrice} = useCart();

  const totalPrice = getTotalPrice();

  const handleNewOrder = () => {
        sessionStorage.removeItem('cartItems');
        window.location.reload();
  }
  return (
    visible ? (
        <div className='fixed inset-0 flex items-center justify-center z-20'>
            <div className="absolute inset-0 bg-gray-500 opacity-30"></div>
            <div className='flex flex-col bg-white p-6 w-full sm:max-w-[700px] max-w-[400px] h-fit rounded-lg z-20 gap-6'>
                <img src={orderConfirmed} alt='order confirmed' className='h-10 w-10' />
                <h1 className='text-4xl font-bold'>Order Confirmed</h1>
                <p className='text-normal text-amber-700'>We hope you enjoy your food!</p>

                <div className='flex flex-col p-4 bg-orange-100 rounded-lg gap-2'>
                    {
                        cartItems.map((item, index) => {
                            return <CartItem key={index} name={item.name} price={item.price} itemCount={item.itemCount} totalPrice={item.itemCount * item.price} image={item.image} orderConf={true} />
                        })
                    }

                    <div className='flex flex-row justify-between items-center w-full'>
                        <span className='text-normal'>Order Total</span>
                        <span className='text-4xl font-bold'>${totalPrice}</span>
                    </div>
                </div>

                <button onClick={handleNewOrder} className='bg-red-600 text-white w-full mt-3 h-14 py-3 rounded-full'>Start new order</button>


            
        </div>
        </div>
    ) :
    null
  )
}

export default OrderConfirmed
