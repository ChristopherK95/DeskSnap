// import { invoke } from '@tauri-apps/api/tauri';
import './App.css';
import VideoPlayer from './components/video-player/VideoPlayer';

function App() {
  return (
    <div className="container" style={{ paddingTop: 0 }}>
      <VideoPlayer />
    </div>
  );
}

export default App;
