import React from 'react'
import loadQuantity from './../../asset/images/loadQlt.gif'

function LoadQuantity() {
    return ( 
        <div className='loadQuantity'>
            <img className='loadQuantity' style={{width: '50px'}} src={loadQuantity} alt="" />
        </div>
     );
}

export default LoadQuantity;