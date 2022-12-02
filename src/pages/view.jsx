import React from 'react'
import ProfilePublic from '../pages/public-profile.jsx'
import {useLocation} from 'react-router-dom'

export default function View() {
  const location = useLocation();
  const value = location.state;
  return (
    <div>
      <ProfilePublic className="profile" name={value.name} state={value.state} year={value.year} make={value.make} model={value.model} img1={value.img1} />
    </div>
  )
}
