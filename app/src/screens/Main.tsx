import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import ProfileCard, { ProfileCardProps } from '../components/ProfileCardView';
import ScreenView from '../components/ScreenView';

const profiles: ProfileCardProps[] = [
  {
    name: 'Rado1',
    profilePicture:
      'https://scontent.fsof8-1.fna.fbcdn.net/v/t1.18169-9/13179355_1095391040502845_7910805570223620117_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=boXg4MXsjxMAX_pOImy&tn=gZeu5a1OuMqe3Zvr&_nc_ht=scontent.fsof8-1.fna&oh=3260a330ec2b82ce2736ae959292693b&oe=61D0BF98',
    age: 21,
    description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
    location: 'Sofia',
  },
  {
    name: 'Rado2',
    profilePicture:
      'https://scontent.fsof8-1.fna.fbcdn.net/v/t1.18169-9/13179355_1095391040502845_7910805570223620117_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=boXg4MXsjxMAX_pOImy&tn=gZeu5a1OuMqe3Zvr&_nc_ht=scontent.fsof8-1.fna&oh=3260a330ec2b82ce2736ae959292693b&oe=61D0BF98',
    age: 21,
    description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
    location: 'Sofia',
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
      <ProfileCard key={profileIndex} onSwipe={handleDiscard} {...profile} />
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
