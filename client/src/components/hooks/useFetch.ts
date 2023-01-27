import axios from 'axios';
import { useQuery } from 'react-query';
import { QueryKey } from 'react-query/types/core';
import { UseQueryOptions } from 'react-query/types/react';

type Route = 'storage' | 'channel' | 'channel-connection' | 'url' | 'user';

type Storage = 'uploadFile' | 'deleteFile';

type Channel =
  | 'createChannel'
  | 'removeChannel'
  | 'getChannelName'
  | 'getChannels'
  | 'getUsers';

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
  | 'getChannels'
  | 'updateUser'
  | 'deleteUser'
  | 'login';

type Action<T extends Route> = T extends 'storage'
  ? Storage
  : T extends 'channel'
  ? Channel
  : T extends 'url'
  ? Url
  : User;

interface Params<T extends Route, K> {
  key: string;
  route: T;
  action: Action<T>;
  payload?: object;
  options?: Omit<
    UseQueryOptions<K, unknown, K, QueryKey>,
    'queryKey' | 'queryFn'
  >;
}

export default <T extends Route, K>(params: Params<T, K>) =>
  useQuery<K, unknown, K, QueryKey>(
    params.key,
    async () =>
      (
        await axios.post(
          `http://localhost:3000/${params.route}/${params.action}`,
          params.payload,
        )
      ).data,
    params.options,
  );

export const fetchOnce = async <T extends Route, K>(
  params: Omit<Params<T, K>, 'key' | 'options'>,
) =>
  axios.post<K>(
    `http://localhost:3000/${params.route}/${params.action}`,
    params.payload,
  );
