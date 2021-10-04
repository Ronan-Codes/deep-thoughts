import React from "react";
import { Link } from 'react-router-dom';

// receives 2 props: `title & thoughts array`
// destructured argument data to avoid using `props.title` & `props.thoughts`
const ThoughtList = ({ thoughts, title }) => {
    if(!thoughts.length) {
        return <h3>No Thoughts Yet</h3>
    }

    // REVIEW
    return (
        <div>
            <h3>{title}</h3>
            {thoughts &&
                thoughts.map(thought => (
                    <div key={thought._id} className="card mb-3">
                        <p className="card-header">
                            {/* Links to User's Profile */}
                            <Link 
                                to={`/profile/${thought.username}`}
                                style={{ fontWeight: 700}}
                                className="text-light"
                            >
                                {thought.username}
                            </Link>{' '}
                            thought on {thought.createdAt}
                        </p>
                        <div className="card-body">
                            {/* Links to SingleThought */}
                            <Link to={`/thought/${thought._id}`}>
                                <p>{thought.thoughtText}</p>
                                <p className="mb-0">
                                    Reactions: {thought.reactionCount} || Click to {''} 
                                    {thought.reactionCount ? 'see' : 'start'} the discussion!
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ThoughtList