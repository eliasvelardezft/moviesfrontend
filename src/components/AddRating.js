import React, { useEffect, useState } from 'react';

import { Label, InputField, Button } from '.';

const AddRating = (props) => {
    
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');

    const submitRating = (e) => {
        e.preventDefault();

        let ratingObj = {
            'rating': parseInt(rating),
            'comment': comment
        }

        props.submitRating(ratingObj);
        setRating(1);

    }

    return(
        <div>
            <form action="" id="add-rating-form" onSubmit={submitRating}
                className='flex flex-col'>
            
            <Label>Rating</Label>
            <select onChange={(e) => setRating(e.target.value)} value={rating} id="select-rating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>

            <Label>Comment</Label>
            <textarea name="comment" id="comment" cols="20" rows="5"
                className='border-2 border-purple-400 
                    rounded-lg focus:outline-none p-2'
                onChange={(e) => setComment(e.target.value)}>
            </textarea>

            <Button type='submit'>Submit</Button>

            

            </form>
        </div>
    )
};

export default AddRating;