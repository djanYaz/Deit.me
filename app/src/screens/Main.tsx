import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import ProfileCard, { ProfileCardProps } from '../components/ProfileCard';
import ScreenView from '../components/ScreenView';

const profiles: ProfileCardProps[] = [
  {
    name: 'Rado1',
  },
  {
    name: 'Rado2',
  },
  {
    name: 'Rado3',
  },
];

export default function Main() {
  const [profileIndex, setProfileIndex] = useState(0);

  useEffect(() => {
    console.log('profile index', profileIndex);
  }, [profileIndex]);

  function handleDiscard() {
    const index = profileIndex + 1;
    if (index >= profiles.length) {
      setProfileIndex(0);
    } else {
      setProfileIndex(index);
    }
  }

  function renderProfiles() {
    const profile = profiles[profileIndex];
    return (
      <ProfileCard
        name={profile.name}
        key={profileIndex}
        onDiscard={handleDiscard}
      />
    );
  }
  return <ScreenView style={styles.container}>{renderProfiles()}</ScreenView>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 32,
  },
});
