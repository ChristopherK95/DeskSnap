// import { invoke } from '@tauri-apps/api/tauri';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import HomePage from './components/page/Page';
import SidebarProvider from './components/sidebar/SidebarContext';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import axios from 'axios';
import LoginPage from './components/page/login-page/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './slice/userSlice';
import { useEffect } from 'react';
import { RootState } from './store';
import ModalProvider from './components/popup/PopupContext';

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const router = createBrowserRouter([
    {
      path: '/',
      element: user.isLoggedIn ? (
        <Navigate replace to={'/home'} />
      ) : (
        <Navigate replace to={'/login'} />
      ),
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/home',
      element: <HomePage />,
    },
  ]);

  useEffect(() => {
    const getSess = async () => {
      const a = (
        await axios.get<{
          isLoggedIn: boolean;
          user: { id: string; username: string };
        }>('http://localhost:3000/user/isLoggedIn', { withCredentials: true })
      ).data;
      dispatch(setUser({ ...a.user, isLoggedIn: a.isLoggedIn }));
    };
    if (!user.isLoggedIn) {
      getSess();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container" style={{ paddingTop: 0 }}>
        <ModalProvider>
          <SidebarProvider>
            <RouterProvider router={router} />
          </SidebarProvider>
        </ModalProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
