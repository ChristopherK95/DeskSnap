import axios from 'axios';
import { useQuery } from 'react-query';
import { QueryKey } from 'react-query/types/core';
import { UseQueryOptions, UseQueryResult } from 'react-query/types/react';

type Route = 'storage' | 'channel' | 'channel-connection' | 'url' | 'user';

type Storage = 'storage/uploadFile' | 'storage/deleteFile';

type Channel =
  | 'channel/createChannel'
  | 'channel/removeChannel'
  | 'channel/getChannelName'
  | 'channel/getChannels'
  | 'channel/getUsers'
  | 'channel/getChannelsOverview'
  | 'channel/acceptInvite'
  | 'channel/removeUser';

type Url =
  | 'url/createUrl'
  | 'url/getUrlsNotSeen'
  | 'url/getUrlsByChannelId'
  | 'url/getNextUrl'
  | 'url/removeUrl';

type User =
  | 'user/createUser'
  | 'user/getUser'
  | 'user/getUsers'
  | 'user/updateUser'
  | 'user/deleteUser'
  | 'user/login'
  | 'user/logout'
  | 'user/invite'
  | 'user/getInvites'
  | 'user/invitesSeen'
  | 'user/declineInvite';

type Action<T extends Route> = T extends 'storage'
  ? Storage
  : T extends 'channel'
  ? Channel
  : T extends 'url'
  ? Url
  : User;

interface Params<T extends Route, K> {
  key: string;
  action: Action<T>;
  payload?: object;
  options?: Omit<
    UseQueryOptions<K, unknown, K, QueryKey>,
    'queryKey' | 'queryFn'
  >;
  withCredentials?: boolean;
}

export default <T extends Route, K>(params: Params<T, K>): UseQueryResult<K> =>
  useQuery<K, unknown, K, QueryKey>(
    params.key,
    async () =>
      (
        await axios.post(
          `http://localhost:3000/${params.action}`,
          params.payload,
        )
      ).data,
    params.options,
  );

export const fetchOnce = async <T extends Route, K = never>(
  params: Omit<Params<T, K>, 'key' | 'options'>,
) =>
  axios.post<K>(`http://localhost:3000/${params.action}`, params.payload, {
    withCredentials: params.withCredentials,
  });
