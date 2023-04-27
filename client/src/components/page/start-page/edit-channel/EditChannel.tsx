import { useContext, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import useNotify from '../../../../reusable/hooks/use-notify';
import { fetchOnce } from '../../../hooks/useFetch';
import Input from '../../../input/Input';
import Popup from '../../../popup/Popup';
import { PopupContext } from '../../../popup/PopupContext';
import { Container, List, Title } from './Styles';

const EditChannel = () => {
  const [channelName, setChannelName] = useState<string>('');

  const { showEdit, setShowEdit } = useContext(PopupContext);
  const notify = useNotify();
  const queryClient = useQueryClient();

  const confirm = async () => {
    const response = await fetchOnce<'channel'>({
      action: 'channel/updateChannelName',
      payload: { channel_id: showEdit?._id, channel_name: channelName },
    });
    if (response.status === 500) {
      notify(response.data, undefined, true);
      return;
    }
    notify('Channel name updated!');
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
