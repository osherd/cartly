import { useState } from 'react';
import Card from '../../components/card/Card.js';
import { BiLogIn } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './auth.module.scss';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { login, validateEmail } from '../../services/authService';
import {
  SET_LOGIN,
  SET_NAME,
  SET_USER,
} from '../../redux/store/features/auth/authSlice.js';
import Loader from '../../components/loader/Loader.tsx';
import PasswordInput from '../../components/passwordInput/PasswordInput.tsx';
const initialState = {
  email: '',
  password: '',
  loggedIn: false,
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const { email, password } = formData;

  const userData = {
    email: email,
    password: password,
    loggedIn: true,
  };

  interface LoginResponse {
    name: string;
  }

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('All fields are required');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    setIsLoading(true);
    try {
      const data = (await login(userData)) as LoginResponse;
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      await dispatch(SET_USER(data.name));

      navigate('/');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <BiLogIn size={35} color='#999' />
          </div>
          <h2>Login</h2>
          <div className='--flex-center'>
            <button className='--btn --btn-google'> Login With Google</button>
          </div>
          <br />
          <p className='--text-center --fw-bold'>or</p>
          <form onSubmit={loginUser}>
            <input
              type='email'
              placeholder='Email'
              name='email'
              required
              value={email}
              onChange={handleInputChange}
            />
            <PasswordInput
              name='password'
              value={password}
              placeholder='Password'
              onChange={handleInputChange}
              onPaste={() => {}}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Login
            </button>
            <Link to='/forgot'>Forgot Password</Link>
            <span className={styles.register}>
              <Link to='/'>Home</Link>
              <p>&nbsp; Don&apos;t have an acount ? &nbsp;</p>
              <Link to='/signup'>Register</Link>
            </span>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
