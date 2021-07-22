import React, { useState, useEffect } from 'react';
import { Button } from '.';

const Watchlist = ({ list, removeMovie, visible }) => {
    const [watchlist, setWatchlist] = useState(list);
    useEffect(() => {
        setWatchlist(list);
    }, [list])

    const removeFromWatchlist = (m) => {
        removeMovie(m);
    }

    return(
        <table className='absolute top-12'>
            <tbody>
                {
                    watchlist.map(m => {
                        return (
                            <tr key={m.id}
                                className={`bg-red-300 py-2 px-3 flex justify-between 
                                ${visible ? ' visible opacity-100' : 'h-0 invisible opacity-0'}
                                transition-opacity duration-200 ease-in-out
                                `}>
                                <td>
                                    <span>{m.title}</span>
                                </td>
                                <td>
                                    <Button color='rgb(116, 160, 232)'
                                        onClick={() => removeFromWatchlist(m)}>
                                        x
                                    </Button>

                                </td>
                                
                            </tr>

                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Watchlist;