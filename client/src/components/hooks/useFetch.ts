import axios, { AxiosResponse } from 'axios';

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

type Params<T extends Route> = {
  route: T;
  action: T extends 'storage'
    ? Storage
    : T extends 'channel'
    ? Channel
    : T extends 'channel-connection'
    ? ChannelConnection
    : T extends 'url'
    ? Url
    : User;
  payload?: object;
};

const useFetch = () => {
  const fetch = async <T extends Route, K>(params: Params<T>) => {
    const result = await axios.post<K>(
      `http://localhost:3000/${params.route}/${params.action}`,
      params.payload,
    );
    return result;
  };

  return fetch;
};

export default useFetch;
