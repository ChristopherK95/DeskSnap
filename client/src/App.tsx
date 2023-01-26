// import { invoke } from '@tauri-apps/api/tauri';
import './App.css';
import HomePage from './components/page/Page';
import SidebarProvider from './components/sidebar/SidebarContext';

function App() {
  return (
    <div className="container" style={{ paddingTop: 0 }}>
      <SidebarProvider>
        <HomePage />
      </SidebarProvider>
    </div>
  );
}

export default App;
