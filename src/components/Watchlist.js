import React, { useState, useEffect } from 'react';
import { get, patch } from '../functions';
import urls from '../apiUrls';

const Watchlist = ({ list, removeMovie }) => {
    const [watchlist, setWatchlist] = useState(list);
    useEffect(() => {
        setWatchlist(list);
    }, [list])

    const removeFromWatchlist = (m) => {
        removeMovie(m);
    }

    return(
        <div className=''>
            {
                watchlist.map(m => {
                    return (
                        <div key={m.id}>
                            {m.title}
                            <button className='px-2 bg-purple-100 ml-3 rounded-lg'
                                onClick={() => removeFromWatchlist(m)}>
                                x
                            </button>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default Watchlist;