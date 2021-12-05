import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import ProfileCard, { ProfileCardProps } from '../components/ProfileCardView';
import ScreenView from '../components/ScreenView';

const profiles: ProfileCardProps[] = [
  {
    name: 'Rado1',
    pictures: [
      'https://scontent.fsof8-1.fna.fbcdn.net/v/t1.18169-9/13179355_1095391040502845_7910805570223620117_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=boXg4MXsjxMAX_pOImy&tn=gZeu5a1OuMqe3Zvr&_nc_ht=scontent.fsof8-1.fna&oh=3260a330ec2b82ce2736ae959292693b&oe=61D0BF98&h=' +
        Date.now(),
      'https://scontent.fsof8-1.fna.fbcdn.net/v/t31.18172-8/28516382_2080868162157657_4546863129146419163_o.jpg?_nc_cat=110&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=SKt1EYZPWpMAX_SMnTi&tn=gZeu5a1OuMqe3Zvr&_nc_ht=scontent.fsof8-1.fna&oh=8e30a10439368a7b8f59f336ec8f8a1d&oe=61D07CD2&h=' +
        Date.now(),
    ],
    age: 21,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    location: 'Sofia',
  },
  {
    name: 'Rado2',
    pictures: [
      'https://scontent.fsof8-1.fna.fbcdn.net/v/t1.18169-9/19224908_755787631265215_2553944708361710059_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=ZCdMNLldJ1cAX_i7n3i&tn=gZeu5a1OuMqe3Zvr&_nc_ht=scontent.fsof8-1.fna&oh=551c8ce01c23dbd8d772a5c552014fc8&oe=61D1A0C3&h=' +
        Date.now(),
      'https://scontent.fsof8-1.fna.fbcdn.net/v/t31.18172-8/18359422_1429080583822397_8379323293752834995_o.jpg?_nc_cat=111&ccb=1-5&_nc_sid=e3f864&_nc_ohc=I_3AsyJ8OngAX95VucA&_nc_ht=scontent.fsof8-1.fna&oh=94339e2f96b902ec962deb114e9b9bc9&oe=61D16544&h=' +
        Date.now(),
    ],
    age: 21,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
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
