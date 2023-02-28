import { useState } from 'react';
import Button from '../../../reusable/components/Button/Button';
import { ButtonContainer, Container, Page } from './Styles';
import UploadFiles from './upload-files/UploadFiles';
import VideoPlayer from './video-player/VideoPlayer';

const ChannelPage = () => {
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
    </Page>
  );
};

export default ChannelPage;
