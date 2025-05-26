import React from 'react'
import { useState } from 'react'
import { ProfileView } from '../../../const'
import Profile from '../Profile'
import ChangePassword from '../ChangePassword'
import ChangeInfo from '../ChangeInfo'

export default function ProfileMenu() {
  const [currentView, setCurrentView] = useState(ProfileView.PROFILE_INFO)

  switch (currentView) {
    case ProfileView.PROFILE_INFO:
      return <Profile handleNavigate={(view) => setCurrentView(view)} />

    case ProfileView.CHANGE_PASSWORD:
      return <ChangePassword handleNavigate={(view) => setCurrentView(view)} />

    case ProfileView.CHANGE_INFO:
      return <ChangeInfo handleNavigate={(view) => setCurrentView(view)} />
  }
}
