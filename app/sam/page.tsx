"use client";

import ProfileCard from './ProfileCard'

export default function Page() {
  return (
    <ProfileCard
      name="Javi A. Torres"
      title="Software Engineer"
      handle="javicodes"
      status="Online"
      contactText="Contact Me"
      avatarUrl="/path/to/avatar.jpg"
      showUserInfo={true}
      enableTilt={true}
      enableMobileTilt={false}
      onContactClick={() => console.log('Contact clicked')}
    />
  )
}