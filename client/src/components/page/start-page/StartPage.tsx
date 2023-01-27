import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { Container } from './Styles';

interface Channels {
  id: string;
  name: string;
}

const StartPage = () => {
  const { data, isLoading } = useFetch<'channel', Channels>({
    route: 'channel',
    action: 'getChannels',
    key: 'channels-overview',
    options: { refetchOnWindowFocus: false },
  });
  const [channels, setChannels] = useState<Channels>();

  useEffect(() => {
    if (data) {
      setChannels(data);
    }
  });

  if (isLoading) {
    return <Container>Loading..</Container>;
  }

  return <Container></Container>;
};

export default StartPage;
