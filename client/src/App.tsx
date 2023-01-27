// import { invoke } from '@tauri-apps/api/tauri';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import HomePage from './components/page/Page';
import SidebarProvider from './components/sidebar/SidebarContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container" style={{ paddingTop: 0 }}>
        <SidebarProvider>
          <HomePage />
        </SidebarProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
