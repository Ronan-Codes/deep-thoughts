import React from 'react';

// Use to parse ID from URL
import { useParams } from 'react-router-dom';

const SingleThought = props => {
  // React Hook to for Params
  const { id: thoughtId } = useParams();
  console.log(thoughtId);
  // id params is from `Route exact path="/thought/:id...` in App.js"

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            Username
          </span>{' '}
          thought on createdAt
        </p>
        <div className="card-body">
          <p>Thought Text</p>
        </div>
      </div>
    </div>
  );
};

export default SingleThought;
