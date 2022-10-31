import React from 'react'
import loadCart from './../../asset/images/loadCart.gif'

function LoadCart() {
    return ( 
        <div className='loadCart' style={{position: 'static'}}>
            <img className='loading' src={loadCart} alt="" />
        </div>
     );
}

export default LoadCart;