import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import ProfileCard, { ProfileCardProps } from '../components/ProfileCardView';
import ScreenView from '../components/ScreenView';
import { getRandomArbitrary } from '../utils';

const profiles: ProfileCardProps[] = [
  {
    name: 'Rado1',
    hobbies: ['MMA', 'Cross', 'Box', 'Macki', 'BMW'],
    pictures: [],
    age: 21,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    location: 'Sofia',
  },
  {
    name: 'Rado2',
    hobbies: ['BMW', 'Macki', 'Cici', 'Dupe'],
    pictures: [],
    age: 21,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    location: 'Sofia',
  },
];

export default function Main() {
  const [profileIndex, setProfileIndex] = useState(0);

  // Fill in random pictures
  useEffect(() => {
    profiles.forEach(profile => {
      const picturesLen = getRandomArbitrary(1, 5);
      for (var i = 0; i < picturesLen; i++) {
        profile.pictures.push(
          'https://picsum.photos/200/300?random=' + getRandomArbitrary(1, 20),
        );
      }
    });
  }, []);
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
      <ProfileCard key={Date.now()} onSwipe={handleDiscard} {...profile} />
    );
  }
  return <ScreenView style={styles.container}>{renderProfiles()}</ScreenView>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 32,
  },
});
