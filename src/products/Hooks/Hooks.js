import React, { useState } from "react";

// Format money
export const FormatMoney = (money) => {
    let str = money.toString();
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ' ')) + prev;
    });
}

// Check object
export const isEmpty = (obj) => {
    for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

// Slide Image
export const Carousel = ({ children }) => {
    const MAX_VISIBILITY = 3;

    const [active, setActive] = useState(2);
    const count = React.Children.count(children);

    return (
        <div className='carousel'>
            {active > 0 &&
                <div className='nav-left' onClick={() => setActive(i => i - 1)}>
                    <i class="fa-solid fa-chevrons-left"></i>
                </div>}
            {React.Children.map(children, (child, i) => (
                <div className='card-image-container' style={{
                    '--active': i === active ? 1 : 0,
                    '--offset': (active - i) / 3,
                    '--direction': Math.sign(active - i),
                    '--abs-offset': Math.abs(active - i) / 3,
                    'pointer-events': active === i ? 'auto' : 'none',
                    'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
                    'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
                }}>
                    {child}
                </div>
            ))}
            {active < count - 1 &&
                <div className='nav-right' onClick={() => setActive(i => i + 1)}>
                    <i class="fa-solid fa-chevrons-right"></i>
                </div>}
        </div>
    );
};