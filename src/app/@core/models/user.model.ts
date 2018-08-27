export class User {
  email: string;
  token: string;
  firstName: string;
  lastName: string;
  fullName: string;
  remember: boolean;
  username: string;
  password: string;
  userRole: Array<string>;
  isEdited: boolean = false;
  mainRole: string;
  index: number;
}
