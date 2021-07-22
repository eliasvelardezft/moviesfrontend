import React, { useState, useEffect } from 'react';

import { Watchlist, Button } from '.';

const UserHeader = ({ user, removeMovieFromWatchlist }) => {
    
    const [showWatchlist, setShowWatchlist] = useState(false);
    const toggleWatchlist = () => {
        setShowWatchlist(prev => !prev);
    }
    
    const [watchlist, setWatchlist] = useState(user.movies_watchlist);
    useEffect(() => {
        setWatchlist(user.movies_watchlist);
    }, [user])

    
    return(
        <div className='flex justify-around relative'>
            <h1 className='text-2xl font-semibold text-center mb-6'>
                Bienvenido {user.username}
            </h1>
            <div className='flex flex-col items-center'>
                <Button color='rgb(167, 139, 250)'
                    onClick={toggleWatchlist}>
                    watchlist
                </Button>
                <Watchlist list={watchlist || []} removeMovie={removeMovieFromWatchlist}
                    visible={showWatchlist}
                />
            </div>
        </div>
    )
}

export default UserHeader;