import styled from 'styled-components';

export const VideoContaier = styled.div<{ stillCursor: boolean }>`
  position: relative;
  width: 100%;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 8px;
  overflow: hidden;
  cursor: ${(p) => (p.stillCursor ? 'none' : 'default')};
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
