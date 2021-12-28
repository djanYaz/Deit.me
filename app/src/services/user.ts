import { API_URL } from '../constants';
import { UserCredentials, UserRegisterDTO } from '../types';
import { makeRequest } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

class User {
  private userCredentials: UserCredentials | undefined;

  async handleAuth(response: { status: number; data: any } | undefined) {
    if (response && response.status === 200) {
      this.userCredentials = { ...response.data };
      await AsyncStorage.setItem('user', JSON.stringify(this.userCredentials));
      return { ...this.userCredentials };
    } else {
      return false;
    }
  }

  async login(email: string, password: string) {
    const response = await makeRequest(API_URL + 'auth/signin', 'POST', {
      email,
      password,
    });
    return await this.handleAuth(response);
  }

  async register(info: UserRegisterDTO) {
    try {
      const response = await makeRequest(API_URL + 'auth/signup', 'POST', info);
      return await this.handleAuth(response);
    } catch (error) {
      return false;
    }
  }

  async logout() {
    this.userCredentials = undefined;
    await AsyncStorage.removeItem('user');
  }

  getCredentials() {
    return this.userCredentials;
  }
}

export default new User();
