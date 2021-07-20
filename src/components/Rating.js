import React, { useState, useEffect } from 'react';

const Rating = ({ rating }) => {
    return (
        <div className='m-2 border-1'>
        <ul className='list-disc'>
            <li>
                rating: {rating.rating}
            </li>
            <li>
                comment: {rating.comment}
            </li>
            <li>
                user: {rating.user}
            </li>
        </ul>
        </div>
    )
}

export default Rating;