import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type RootState } from '../store';
import { login, register, logout } from '../store/slices/authSlice';
import type { LoginFormValues, RegisterFormValues } from '../lib/validations/auth.schema';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (data: LoginFormValues) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      navigate('/dashboard');
    }
    return result;
  };

  const handleRegister = async (data: RegisterFormValues) => {
    const result = await dispatch(register(data));
    if (register.fulfilled.match(result)) {
      navigate('/dashboard');
    }
    return result;
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};


// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store';
// import { logout } from '../store/slices/authSlice';

// export const useAuth = () => {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return {
//     user,
//     isAuthenticated,
//     isLoading,
//     logout: handleLogout,
//   };
// };