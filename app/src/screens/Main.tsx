import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import ProfileCard, { ProfileCardProps } from '../components/ProfileCardView';
import ScreenView from '../components/ScreenView';
import { API_URL } from '../constants';
import user from '../user';
import { makeRequest } from '../utils';
//TODO: Refactor
export interface ProfileDTO {
  token: string;
  user: {
    id: 6;
    firstName: string;
    lastName: string;
    gender: string;
    preference: string;
    description: string;
    hobby: { id: number; hobby: string }[];
  };
}
export default function Main() {
  const [profile, setProfile] = useState<ProfileDTO | undefined>();
  const [loading, setLoading] = useState(false);
  // Fill in random pictures
  // useEffect(() => {
  //   profiles.forEach(profile => {
  //     const picturesLen = getRandomArbitrary(1, 5);
  //     for (var i = 0; i < picturesLen; i++) {
  //       profile.pictures.push(
  //         'https://picsum.photos/200/300?random=' +
  //           Math.floor(getRandomArbitrary(1, 20)),
  //       );
  //     }
  //   });
  // }, []);

  async function handleNewProfile() {
    console.log('getting new profile');
    setLoading(true);
    const newProfile = await makeRequest(
      API_URL + 'api/browse?shouldMatchHobbies=0',
      'GET',
      undefined,
      user.getCredentials(),
    );
    if (newProfile) {
      setProfile({ ...newProfile.data });
    }
  }
  // Load initial profile
  useEffect(() => {
    handleNewProfile();
  }, []);

  useEffect(() => {
    // New profile
    setLoading(false);
    console.log('profile', profile);
  }, [profile]);

  function handleDiscard() {
    handleNewProfile();
  }

  function renderProfiles() {
    const profileUser = profile?.user;
    if (profileUser === undefined) {
      return null;
    }
    const _profile: ProfileCardProps = {
      name: `${profileUser.firstName} ${profileUser?.lastName}`,
      hobbies: profileUser.hobby.map(h => h.hobby),
      pictures: [],
      description: profileUser.description,
      location: '',
      age: 0,
    };
    return (
      <ProfileCard key={Date.now()} onSwipe={handleDiscard} {..._profile} />
    );
  }
  return (
    <ScreenView loading={loading} style={styles.container}>
      {renderProfiles()}
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 32,
  },
});
