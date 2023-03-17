import { useContext, useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../../../slice/notifSlice';
import { fetchOnce } from '../../../hooks/useFetch';
import Input from '../../../input/Input';
import Popup from '../../../popup/Popup';
import { PopupContext } from '../../../popup/PopupContext';
import { Container, List, Title } from './Styles';

const EditChannel = () => {
  const [channelName, setChannelName] = useState<string>('');

  const { showEdit, setShowEdit } = useContext(PopupContext);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const confirm = async () => {
    const response = await fetchOnce<'channel'>({
      action: 'channel/updateChannelName',
      payload: { channel_id: showEdit?._id, channel_name: channelName },
    });
    if (response.status === 500) {
      dispatch(setNotif({ message: response.data, error: true }));
      return;
    }
    dispatch(setNotif({ message: 'Channel name updated!' }));
    queryClient.invalidateQueries('channels-overview');
    queryClient.invalidateQueries('sidebar-channels');
  };

  useEffect(() => {
    if (showEdit) setChannelName(showEdit.channel_name);
  }, [showEdit]);

  return (
    <>
      {showEdit && (
        <Popup
          onClose={() => setShowEdit(undefined)}
          onConfirm={confirm}
          showPopup={Boolean(showEdit)}
        >
          <Container>
            <Title>{showEdit?.channel_name}</Title>
            <List>
              <Input
                onKeyEnter={() => {
                  confirm();
                  setShowEdit(undefined);
                }}
                label="Channel name"
                value={channelName}
                onChange={setChannelName}
                type="text"
              />
            </List>
          </Container>
        </Popup>
      )}
    </>
  );
};

export default EditChannel;
