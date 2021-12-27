import { API_URL } from './constants';
import { makeRequest } from './utils';

export interface UserRegisterDTO {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  preference?: string;
  gender?: string;
  hobbies?: { [id: string]: string };
}
export interface UserCredentials {
  token: string;
  type: 'Bearer';
  id: number;
  email: string;
}

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
