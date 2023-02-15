export interface User {
  _id: string;
  username: string;
}
export interface Channels {
  _id: string;
  channel_name: string;
  users: User[];
  owner: User;
}
