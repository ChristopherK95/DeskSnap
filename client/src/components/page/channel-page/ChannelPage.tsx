import { useEffect, useState } from 'react';
import Cross from '../../../svgs/Cross';
import Deny from '../../../svgs/Deny';
import FolderIcon from '../../../svgs/FolderIcon';
import {
  Container,
  DropContainer,
  Filename,
  FileOptions,
  FileRow,
  Files,
  Icon,
  InputContainer,
  Label,
  Menu,
  MenuContainer,
  Page,
  Upload,
} from './Styles';
import VideoPlayer from './video-player/VideoPlayer';

const ChannelPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const arr = [];
    for (const file of e.dataTransfer.files) {
      arr.push(file);
    }
    setFiles(arr);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    const arr = [];
    for (const file of e.target.files) {
      arr.push(file);
    }
    setFiles(arr);
  };

  const removeFile = (index: number) => {
    const arr = files.filter((file) => file !== files[index]);
    setFiles(arr);
  };

  return (
    <Page>
      <Container>
        <MenuContainer>
          <Menu>
            <DropContainer empty={files.length === 0}>
              <InputContainer>
                <Upload
                  onDrop={(e) => handleDrop(e)}
                  onDragOver={(e) => handleDrag(e)}
                >
                  <input
                    type="file"
                    id="upload"
                    multiple={true}
                    hidden
                    onChange={(e) => handleOnChange(e)}
                  />
                  <Label htmlFor="upload">Choose Files</Label>
                  <Icon htmlFor="upload">
                    <FolderIcon />
                  </Icon>
                </Upload>
              </InputContainer>
              <Files>
                {files.map((file, i) => (
                  <FileRow key={i}>
                    <Filename>{file.name}</Filename>
                    <FileOptions>
                      <Deny
                        onClick={() => {
                          removeFile(i);
                        }}
                      />
                    </FileOptions>
                  </FileRow>
                ))}
              </Files>
            </DropContainer>
          </Menu>
        </MenuContainer>
        <VideoPlayer />
      </Container>
    </Page>
  );
};

export default ChannelPage;
