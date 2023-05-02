import { useState } from 'react';
import Button from '../../../reusable/components/Button/Button';
import { Channel } from '../start-page/types';
import MemberList from './member-list/MemberList';
import { ButtonContainer, Container, Page } from './Styles';
import UploadFiles from './upload-files/UploadFiles';
import VideoPlayer from './video-player/VideoPlayer';

const ChannelPage = (props: { channel: Channel }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Page>
      <Container>
        <VideoPlayer />
      </Container>
      <ButtonContainer>
        <Button onClick={() => setShowModal(true)}>Upload video</Button>
      </ButtonContainer>
      {showModal && (
        <UploadFiles showModal={showModal} setShowModal={setShowModal} />
      )}
      <MemberList channel={props.channel} />
    </Page>
  );
};

export default ChannelPage;
