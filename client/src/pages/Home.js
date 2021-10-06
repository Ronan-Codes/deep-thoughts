import React from 'react';

// useQuery allows requests to GraphQL server (connected throught <ApolloProvider> in App.js)
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
// Need to check for logged-in status of user
import Auth from '../utils/auth';

import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';

const Home = () => {
  const loggedIn = Auth.loggedIn();

  // use useQuery hook to make query request 
  // this is asynchronous and provides `loading` property while waiting. Information is stored in `data`
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive 
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // `optional chaining`: if data exists, store it in thoughts constant. If data is undefined, save an empty array to the thoughts component
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..."/>
          )}
        </div>

        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
