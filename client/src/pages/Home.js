import React from 'react';

// useQuery allows requests to GraphQL server (connected throught <ApolloProvider> in App.js)
import { useQuery } from '@apollo/client';
import { Query_Thoughts } from '../utils/queries';

import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // use useQuery hook to make query request 
  // this is asynchronous and provides `loading` property while waiting. Information is stored in `data`
  const { loading, data } = useQuery(Query_Thoughts);

  // `optional chaining`: if data exists, store it in thoughts constant. If data is undefined, save an empty array to the thoughts component
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..."/>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
