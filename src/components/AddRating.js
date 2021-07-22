import React, { useEffect, useState } from 'react';

import { Label, Button } from '.';

const AddRating = (props) => {
    
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');

    const submitRating = (e) => {
        e.preventDefault();

        let ratingObj = {
            'rating': parseInt(rating),
            'comment': comment,
            'user': localStorage.getItem('username')
        }

        props.submitRating(ratingObj);
        console.log('RATING OBJ: ', ratingObj);
        setRating(1);

    }

    return(
        <div className='flex justify-center'>
            <form action="" id="add-rating-form" onSubmit={submitRating}
                className='flex flex-col items-center'>
            
            <Label>Rating</Label>
            <select className='bg-purple-300 rounded-lg w-12 px-3 py-1'
                onChange={(e) => setRating(e.target.value)} value={rating} id="select-rating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <Label>Comment</Label>
            <textarea name="comment" id="comment" cols="20" rows="5"
                className='w-60 border-2 border-purple-400 
                    rounded-lg focus:outline-none p-2' required
                onChange={(e) => setComment(e.target.value)}>
            </textarea>

            <Button type='submit' color='rgb(167, 139, 250)'
                className='mt-4'>
                Submit
            </Button>

            

            </form>
        </div>
    )
};

export default AddRating;