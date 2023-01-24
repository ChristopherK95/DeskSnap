import axios from 'axios';

type Route = 'storage' | 'channel' | 'channel-connection' | 'url' | 'user';

type Storage = 'uploadFile' | 'deleteFile';

type Channel =
  | 'createChannel'
  | 'removeChannel'
  | 'getChannelName'
  | 'getChannels';

type ChannelConnection =
  | 'getConnections'
  | 'getConnectionsByUserId'
  | 'getConnectionsByChannelId'
  | 'removeConnectionByUserId'
  | 'removeConnectionByChannelId';

type Url =
  | 'createUrl'
  | 'getUrlsNotSeen'
  | 'getUrlsByChannelId'
  | 'getNextUrl'
  | 'removeUrl';

type User =
  | 'createUser'
  | 'getUser'
  | 'getUsers'
  | 'updateUser'
  | 'deleteUser'
  | 'login';

type Params = {
  route: Route;
  action: Route extends 'storage'
    ? Storage
    : Route extends 'channel'
    ? Channel
    : Route extends 'channel-connection'
    ? ChannelConnection
    : Route extends 'url'
    ? Url
    : User;
  payload?: object;
};

const useFetch = () => {
  const fetch = async <K>(params: Params) => {
    const result = await axios.post<K>(
      `http://localhost:3000/${params.route}/${params.action}`,
      params.payload,
    );
    return result;
  };

  return fetch;
};

export default useFetch;
