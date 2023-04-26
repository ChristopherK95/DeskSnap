import React, { useState } from 'react';

interface Channel {
    id: string;
    channelName: string;
  }

export const SidebarContext = React.createContext<{
  activeChannel: Channel;
  setActiveChannel: (channel: Channel) => void;
}>({ activeChannel: {id: '', channelName: 'home'}, setActiveChannel: () => {} });

const SidebarProvider = (props: { children: React.ReactNode }) => {
  const [activeChannel, setActiveChannel] = useState<Channel>({id: '', channelName: 'home'});

  return (
    <SidebarContext.Provider value={{ activeChannel, setActiveChannel }}>
      {props.children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
