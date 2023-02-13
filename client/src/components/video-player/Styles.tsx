import styled from 'styled-components';

export const VideoContaier = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  box-shadow: -3px 3px 3px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  :hover {
    #slider {
      padding: 10px 0 40px 0;
    }
    #volume-icon {
      display: flex;
    }
    #volume {
      display: flex;
    }
    #mute {
      display: block;
    }
  }
`;

export const Video = styled.video`
  user-select: none;
  width: 100%;
  max-height: 100%;
  background-color: black;
`;
