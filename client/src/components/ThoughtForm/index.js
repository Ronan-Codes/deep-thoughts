import React, { useState } from "react";

const ThoughtForm = () => {
    const [thoughtText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

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
        setText('');
        setCharacterCount(0);
    }

    return (
        <div>
            {/* if characterCount is = 280, font will be red */}
            <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
                CharacterCount: {characterCount}/280
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