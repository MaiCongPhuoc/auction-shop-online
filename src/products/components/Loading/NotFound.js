import React from 'react'
import notfound from './../../asset/images/data-not-found.png'

function NotFound() {
    return (
        <div className='notfound'>
            <img className='notfound' src={notfound} alt="Không tìm thấy" title='Không tìm thấy kết quả nào phù hợp' />
        </div>
    );
}

export default NotFound;