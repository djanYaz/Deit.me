import { API_URL } from './constants';
import { UserCredentials, UserRegisterDTO } from './types';
import { makeRequest } from './utils';

class User {
  private userCredentials: UserCredentials | undefined;
  async login(email: string, password: string) {
    const response = await makeRequest(API_URL + 'auth/signin', 'POST', {
      email,
      password,
    });
    if (response?.status === 200) {
      this.userCredentials = { ...response.data };
      return response.data;
    } else {
      return false;
    }
  }

  async register(info: UserRegisterDTO) {
    try {
      const response = await makeRequest(API_URL + 'auth/signup', 'POST', info);
      if (response?.status === 200) {
        // this.userCredentials = { ...json };
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  getCredentials() {
    return this.userCredentials;
  }
}

export default new User();
