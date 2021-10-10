import React from 'react';

// Use to parse ID from URL
import { useParams } from 'react-router-dom';

// useQuery Hook and QUERY_THOUGHT to query SingleThought data
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import Auth from "../utils/auth";

const SingleThought = props => {
  // React Hook to for Params
  const { id: thoughtId } = useParams();
  // id params is from `Route exact path="/thought/:id...` in App.js"

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: {id: thoughtId}
  });
  // the id property on the variables object will become the $id parameter in the GraphQL query

  // `optional chaining`: if data exists, store it in thoughts constant. If data is undefined, save an empty object to the thought component
  const thought = data?.thought || {};

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}

      {/* ReactionForm, conditionally render */}
      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    </div>
  );
};

export default SingleThought;
