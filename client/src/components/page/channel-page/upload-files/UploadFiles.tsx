import { useContext, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Button from '../../../../reusable/components/Button/Button';
import Modal from '../../../../reusable/components/Modal/Modal';
import { setNotif } from '../../../../slice/notifSlice';
import { socket } from '../../../../socket';
import { RootState } from '../../../../store';
import FolderIcon from '../../../../svgs/FolderIcon';
import Plus from '../../../../svgs/Plus';
import { fetchOnce } from '../../../hooks/useFetch';
import { SidebarContext } from '../../../sidebar/SidebarContext';
import {
  AddMore,
  AddMoreIcon,
  AddMoreLabel,
  ChooseFiles,
  ChooseIcon,
  ChooseLabel,
  DropContainer,
  Filename,
  FileRow,
  Files,
  FileSize,
  InputContainer,
  Loader,
  Menu,
  Submit,
} from './Styles';

const UploadFiles = (props: {
  showModal: boolean;
  setShowModal: (b: boolean) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { activeChannel } = useContext(SidebarContext);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const upload = async () => {
    setUploading(true);
    const data = new FormData();
    const date = new Date();
    files.forEach((file) => {
      data.append('files', file);
    });
    data.append('channel_id', activeChannel);
    data.append('user_id', user.id);
    data.append('date', date.toLocaleDateString());
    const res = await fetchOnce<'url'>({
      action: 'url/createUrl',
      payload: data,
    });
    if (res.status === 201) {
      dispatch(
        setNotif({
          message:
            files.length > 1
              ? 'Videos/Images uploaded!'
              : 'Video/Image uploaded',
        }),
      );
      socket.emit('new_videos', activeChannel);
    } else
      dispatch(
        setNotif({
          message:
            files.length > 1
              ? 'Videos/Images could not be uploaded!'
              : 'Video/Image could not be uploaded',
          error: true,
        }),
      );
    props.setShowModal(false);
    setUploading(false);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const filesFilter = (files: FileList) => {
    let tooLarge = 0;
    let wrongFormat = 0;
    const arr: File[] = [];
    for (const file of files) {
      if (file.type !== 'video/mp4') {
        wrongFormat++;
        continue;
      }
      if (file.size > 25 * 1024 * 1024) {
        tooLarge++;
        continue;
      }
      arr.push(file);
    }

    if (tooLarge > 0 || wrongFormat > 0) {
      let text = '';
      if (wrongFormat > 1)
        text += wrongFormat + ' files were not correct file type!';
      if (wrongFormat === 1)
        text += wrongFormat + ' file was not correct file type!';
      if (tooLarge > 1) text += tooLarge + ' files exceeded 100 MB!';
      if (tooLarge === 1) text += tooLarge + ' file exceeded 100 MB!';
      dispatch(
        setNotif({
          message: text,
          error: true,
        }),
      );
    }

    return arr;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    const arr = [...files];
    const res = filesFilter(e.dataTransfer.files);
    arr.push(...res);
    setFiles(arr);
    setDragActive(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    const arr = [...files];
    const res = filesFilter(e.target.files);
    arr.push(...res);
    setFiles(arr);
    setDragActive(false);
  };

  const removeFile = (index: number) => {
    const arr = files.filter((file) => file !== files[index]);
    setFiles(arr);
  };

  const bytesToSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes.length - 1,
    );
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <Modal onClose={() => props.setShowModal(false)}>
      <Menu
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragEnter={(e) => handleDragStart(e)}
        onDragLeave={(e) => handleDragEnd(e)}
      >
        <DropContainer empty={files.length === 0} dragActive={dragActive}>
          <input
            type="file"
            id="upload"
            multiple
            hidden
            onChange={(e) => handleOnChange(e)}
          />
          <InputContainer empty={files.length === 0}>
            {files.length === 0 && !dragActive && (
              <ChooseFiles>
                <ChooseLabel htmlFor="upload">Choose files</ChooseLabel>
                <ChooseIcon htmlFor="upload">
                  <FolderIcon />
                </ChooseIcon>
              </ChooseFiles>
            )}
            {files.length === 0 && dragActive && (
              <h1 style={{ pointerEvents: 'none' }}>Drop to add!</h1>
            )}
            {files.length > 0 && (
              <AddMore>
                <AddMoreIcon htmlFor="upload">
                  <Plus />
                </AddMoreIcon>
                <AddMoreLabel htmlFor="upload">Add more files</AddMoreLabel>
              </AddMore>
            )}
          </InputContainer>
          <Files>
            {files.map((file, i) => (
              <FileRow className="row" key={i} onClick={() => removeFile(i)}>
                <Filename>{file.name}</Filename>
                <FileSize>{bytesToSize(file.size)}</FileSize>
              </FileRow>
            ))}
          </Files>
          {files.length > 0 && (
            <Submit>
              {!uploading ? (
                <Button onClick={() => upload()}>Upload</Button>
              ) : (
                <Loader />
              )}
            </Submit>
          )}
        </DropContainer>
      </Menu>
    </Modal>
  );
};

export default UploadFiles;
