import React from 'react';

// Redirect is used along with Auth to enhance User Experience
import { useParams, Redirect } from 'react-router-dom';
// Used to enhance User Experience 
import Auth from '../utils/auth';

// Components
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../utils/mutations';
import { QUERY_USER, QUERY_ME } from '../utils/queries';


const Profile = () => {
  const [addFriend] = useMutation(ADD_FRIEND);

  // deconstructed and renamed as userParam?
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam? QUERY_USER: QUERY_ME, {
    variables: { username: userParam }
  });

  // REVIEW
  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is the logged-in user's 
  // purely aesthetic of URL
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />
  }

  if(loading) {
    return <div>Loading...</div>;
  }

  // Prevent page from breaking if User is not logged in and navigate to `/profile`
  if(!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    )
  }

  const handleClick = async() => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam? `${user.username}'s` : 'your'} profile.
        </h2>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
          Add Friend
        </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList 
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>

      <div className="mb-3">{!userParam && <ThoughtForm />}</div>
    </div>
  );
};

export default Profile;
