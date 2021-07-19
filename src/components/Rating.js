import React, { useState, useEffect } from 'react';

const Rating = ({ rating }) => {
    return (
        <div className='m-2 border-1'>
            <p>{rating.rating}</p>
            <p>{rating.comment}</p>
        </div>
    )
}

export default Rating;