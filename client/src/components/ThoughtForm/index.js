import React, { useState } from "react";

import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from "../../utils/mutations";
// Used to update cached array in Home.js & Profile.js
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

const ThoughtForm = () => {
    const [thoughtText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    // addThought() will run the mutation. error initially undefined but cam change if mutation fails 
    // update cache with QUERY_THOUGHT
    const [addThought, { error }] = useMutation(ADD_THOUGHT, {
        update(cache, { data: { addThought } }) {
            // Will update `thoughts` list in Home.js
            try {
                // could potentially not exist yet, so wrap in a try...catch
                    // read what's currently in the cache
                const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS});

                // prepend the newest thought to the front of the array
                cache.writeQuery({
                    query: QUERY_THOUGHTS,
                    data: { thoughts: [addThought, ...thoughts] }
                });

            }   catch (e) {
                console.error(e);
            }

            // update me object's cache, appending new thought to the end of the array (in Profile.js)
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, thoughts: [...me.thoughts, addThought] } }
            })  
        }
    });
    // In the update() function, addThought represents the new thought that was just created. Using the cache object, 
    // we can read what's currently saved in the QUERY_THOUGHTS cache and then update it with writeQuery() to include 
    // the new thought object.

    // changes textarea `value` and limits `word count`
    const handleChange = event => {
        if(event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length)
        }
    }

    // notice the async with `submit handlers` (when calling queries/mutations)
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            // add thought to database
            await addThought({
                variables: { thoughtText }
            });

            // clear form value
            setText('');
            setCharacterCount(0);

        }   catch (e) {
            console.error(e);
        }
    }


    return (
        <div>
            {/* if characterCount is = 280, font will be red */}
            <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
                CharacterCount: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form 
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    value={thoughtText}
                    onChange={handleChange}
                    placeholder="Here's a new thought..."
                    className="form-input col-12 col-md-9"
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ThoughtForm;