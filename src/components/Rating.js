import React, { useState, useEffect } from 'react';

const Rating = ({ rating, index }) => {
    
    let bgColor = (index % 2 === 0) ? 'bg-red-200' : 'bg-purple-200';

    return (
            <tr className={bgColor}>
                <td className='rounded-l-lg'>
                    {
                        [...new Array(rating.rating)].map((s, i) => {

                            return (
                                <span key={i}>{'\u2728'}</span>
                            )
                        })
                    }
                </td>
                <td>{rating.comment}</td>
                <td className='rounded-r-lg'>{rating.user}</td>
            </tr>
    )
}

export default Rating;