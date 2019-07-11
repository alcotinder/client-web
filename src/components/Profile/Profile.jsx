import React from 'react'
import {UserContext} from '../../context';

const Profile = () => {
  return (
    <UserContext>
      {state => (
        <p>
          {state.name}
        </p>
      )}
    </UserContext>
  )
}

export default Profile