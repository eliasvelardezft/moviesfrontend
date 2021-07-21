import React, { useState, useEffect } from 'react';

import { Watchlist } from '.';

const UserHeader = ({ user, removeMovieFromWatchlist }) => {
    
    const [showWatchlist, setShowWatchlist] = useState(true);
    const toggleWatchlist = () => {
        setShowWatchlist(prev => !prev);
    }
    
    const [watchlist, setWatchlist] = useState(user.movies_watchlist);
    useEffect(() => {
        setWatchlist(user.movies_watchlist);
    }, [user])

    
    return(
        <div>
            <nav className='flex'>
                <p>benvenido {user.username}</p>

                <button className='rounded-lg border-1 border-gray-200 bg-blue-100 justify-between'
                    onClick={toggleWatchlist}>
                    watchlist
                </button>

                {
                    showWatchlist
                    ?
                    <Watchlist list={watchlist || []} removeMovie={removeMovieFromWatchlist}/>
                    :
                    null
                }

            </nav>
        </div>
    )
}

export default UserHeader;