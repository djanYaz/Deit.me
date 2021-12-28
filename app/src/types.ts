export interface IHobby {
  id: number;
  hobby: string;
}

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
