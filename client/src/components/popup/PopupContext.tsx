import React, { useState } from 'react';
import { Channel } from '../page/start-page/types';

export const PopupContext = React.createContext<{
  showLogout: boolean;
  setShowLogout: (b: boolean) => void;
  inviteChannelId: string | undefined;
  setInviteChannelId: (b: string | undefined) => void;
  showAddChannel: boolean;
  setShowAddChannel: (b: boolean) => void;
  leaveOrDeleteChannel: Channel | undefined;
  setLeaveOrDeleteChannel: (b: Channel | undefined) => void;
  showEdit: Channel | undefined;
  setShowEdit: (channel: Channel | undefined) => void;
}>({
  showLogout: false,
  setShowLogout: () => {},
  inviteChannelId: undefined,
  setInviteChannelId: () => {},
  showAddChannel: false,
  setShowAddChannel: () => {},
  leaveOrDeleteChannel: undefined,
  setLeaveOrDeleteChannel: () => {},
  showEdit: undefined,
  setShowEdit: () => {},
});

const PopupProvider = (props: { children: React.ReactNode }) => {
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [inviteChannelId, setInviteChannelId] = useState<string>();
  const [showAddChannel, setShowAddChannel] = useState<boolean>(false);
  const [leaveOrDeleteChannel, setLeaveOrDeleteChannel] = useState<Channel>();
  const [showEdit, setShowEdit] = useState<Channel>();

  return (
    <PopupContext.Provider
      value={{
        showLogout,
        setShowLogout,
        inviteChannelId,
        setInviteChannelId,
        showAddChannel,
        setShowAddChannel,
        leaveOrDeleteChannel,
        setLeaveOrDeleteChannel,
        showEdit,
        setShowEdit,
      }}
    >
      {props.children}
    </PopupContext.Provider>
  );
};

export default PopupProvider;
