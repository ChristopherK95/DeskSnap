import React, { useState } from 'react';

export const SidebarContext = React.createContext<{
  activeChannel: string;
  setActiveChannel: (value: string) => void;
}>({ activeChannel: 'home', setActiveChannel: () => {} });

const SidebarProvider = (props: { children: React.ReactNode }) => {
  const [activeChannel, setActiveChannel] = useState<string>('home');

  return (
    <SidebarContext.Provider value={{ activeChannel, setActiveChannel }}>
      {props.children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
