export interface User {
  id: string;
  username: string;
  isLoggedIn: boolean;
}
export interface Channel {
  _id: string;
  channel_name: string;
  users: User[];
  owner: User;
}
