import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  changeUsername as updateUsername,
  setUser,
} from '../../../slice/userSlice';
import { fetchOnce } from '../../hooks/useFetch';

const useFunctions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeUsername = async (user_id: string, username: string) => {
    if (username.length < 3 || username.length > 20)
      return 'The username needs to be at least 4 characters and at most 20';

    const regex = RegExp('^(?=^[^_-]+[-_]?[^_-]+$)[w-]{3,20}$');
    regex.test(username);
    if (!regex) return 'Username does not meet requirements';

    const response = await fetchOnce<'user'>({
      action: 'user/changeUsername',
      payload: { user_id, username },
    });
    if (response.status === 201) dispatch(updateUsername({ username }));
    return response;
  };

  const changePassword = async (
    user_id: string,
    password: string,
    confirmPassword: string,
  ) => {
    if (password.length < 4) return 'Password does not fulfill requirements';
    if (password != confirmPassword) return 'The passwords do not match';

    const response = await fetchOnce<'user'>({
      action: 'user/changePassword',
      payload: { user_id, password },
    });
    return response;
  };

  const deleteAccount = async (user_id: string) => {
    const response = await fetchOnce<'user'>({
      action: 'user/deleteUser',
      payload: { user_id },
    });
    if (response.status !== 500) {
      dispatch(setUser({ id: '', username: '', isLoggedIn: false }));
      navigate('/login');
    }
  };

  return { changeUsername, changePassword, deleteAccount };
};

export default useFunctions;
