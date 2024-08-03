import React, {useEffect} from 'react'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import incrementIcon from '../assets/images/icon-increment-quantity.svg';
import decrementIcon from '../assets/images/icon-decrement-quantity.svg';
import { useCart } from '../cart/CartContext';

const ItemListing = ({image, name, category, price}) => {

  const {addToCart, getItemCount, incrementCount, decrementCount, getTotalPrice, setItemTotalPrice} = useCart();

  const itemCount = getItemCount({name: name});

  const itemTotalPrice = price * itemCount;

    useEffect(() => {
        setItemTotalPrice({name: name}, itemTotalPrice);
    }, [itemCount]);

  const handleAddToCart = () => {
    addToCart({name: name, price});
  }

  const handleDecrementQuantity = () => {
    decrementCount({name: name});
  }

  return (
    <div className='w-full h-full flex flex-col gap-4'>
        <div className={`w-full relative flex justify-center ${itemCount > 0 ? `border-orange-600 rounded-lg border-2` : ``}`}>
            <img src={image.desktop} alt={name} className='w-[400px] h-full object-cover rounded-lg' />
            {
              itemCount <= 0 ? (
                <>
                <div className='p-3 absolute bottom-[-15px] flex flex-row gap-1 items-center justify-center bg-white border border-orange-600 rounded-full' onClick={handleAddToCart}>
                  <MdOutlineAddShoppingCart className='h-5 w-5' fill='brown'/>
                  <span className='text-normal font-semibold'> Add to cart</span>
                </div>
                </>
              ) :
              (
                <div className='p-3 absolute bottom-[-15px] flex flex-row gap-1 items-center justify-between px-4 bg-orange-600 sm:max-w-[200px] max-w-[150px] w-full rounded-full'>
                  <div className='flex justify-center items-center p-3 border border-white rounded-full' onClick={handleDecrementQuantity}>
                    <img src={decrementIcon} alt="decrement" className='min-w-[5px] h-2 w-2'/>
                  </div>
                  <span className='text-white font-semibold'>{itemCount}</span>
                  <div className='flex justify-center items-center p-3 border border-white rounded-full' onClick={handleAddToCart}>
                    <img src={incrementIcon} alt="decrement" className='min-w-[5px] w-2 h-2'/>
                  </div>
                </div>
              )
            }
        </div>

        {/* price part */}
        <div className='flex flex-col gap-1'>
            <span className='text-small font-light text-gray-400'>{category}</span>
            <span className='font-semibold'>{name}</span>
            <span className='font-bold text-amber-700'>$ {price.toFixed(2)}</span>
        </div>
    </div>
  )
}

export default ItemListing
