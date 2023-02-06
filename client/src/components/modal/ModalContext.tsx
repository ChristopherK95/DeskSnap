import React, { useState } from 'react';

export const ModalContext = React.createContext<{
  showLogout: boolean;
  setShowLogout: (b: boolean) => void;
  inviteChannelId: string | undefined;
  setInviteChannelId: (b: string | undefined) => void;
  showAddChannel: boolean;
  setShowAddChannel: (b: boolean) => void;
}>({
  showLogout: false,
  setShowLogout: () => {},
  inviteChannelId: undefined,
  setInviteChannelId: () => {},
  showAddChannel: false,
  setShowAddChannel: () => {},
});

const ModalProvider = (props: { children: React.ReactNode }) => {
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [inviteChannelId, setInviteChannelId] = useState<string>();
  const [showAddChannel, setShowAddChannel] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        showLogout,
        setShowLogout,
        inviteChannelId,
        setInviteChannelId,
        showAddChannel,
        setShowAddChannel,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
