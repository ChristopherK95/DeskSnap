import React, { useState } from 'react';

export const PopupContext = React.createContext<{
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

const PopupProvider = (props: { children: React.ReactNode }) => {
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [inviteChannelId, setInviteChannelId] = useState<string>();
  const [showAddChannel, setShowAddChannel] = useState<boolean>(false);

  return (
    <PopupContext.Provider
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
    </PopupContext.Provider>
  );
};

export default PopupProvider;
