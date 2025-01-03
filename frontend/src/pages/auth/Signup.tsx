import styles from './auth.module.scss';
import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { TiUserAddOutline } from 'react-icons/ti';
import { FaTimes } from 'react-icons/fa';
import { BsCheck2All } from 'react-icons/bs';

import { Link, useNavigate } from 'react-router-dom';

import PasswordInput from '../../components/passwordInput/PasswordInput';
import { useDispatch } from 'react-redux';
import { signup, validateEmail } from '../../services/authService';
import { toast } from 'react-toastify';
import { SET_LOGIN, SET_USER } from '../../redux/store/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

// const BACKEND_URL = 'http://localhost:4000'; //process.env.REACT_APP_BACKEND_URL;
// export const API_URL = `${BACKEND_URL}/auth/users/`;

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const { name, email, password, confirmPassword } = formData;

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);

  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color='red' size={15} />;

  const checkIcon = <BsCheck2All color='green' size={15} />;

  const switchIcon = (condition: boolean) => {
    return condition ? checkIcon : timesIcon;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    // Check for PASSWORD LENGTH
    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  // interface SignupResponse {
  //   // Define the shape of the response from the signup service
  //   // Example:
  //   // id: string;
  //   // name: string;
  //   // email: string;
  // }

  const signupUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error('All fields are required');
    }
    if (password.length < 6) {
      return toast.error('Passwords must be up to 6 characters');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    setIsLoading(true);

    try {
      const data = await signup(formData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_USER(data));
      navigate('/');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <TiUserAddOutline size={35} color='#999' />
          </div>
          <h2>Register</h2>
          <form onSubmit={signupUser}>
            <input
              type='text'
              placeholder='Name'
              name='name'
              required
              value={name}
              onChange={handleInputChange}
            />
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
              onPaste={(e) => e.preventDefault()}
            />
            <PasswordInput
              name='confirmPassword'
              value={confirmPassword}
              placeholder='Confirm Password'
              onChange={handleInputChange}
              onPaste={(e) => e.preventDefault()}
            />
            {/* Password Strength */}
            <Card cardClass={styles.group}>
              <ul className='form-list'>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(uCase)}
                    &nbsp; LowerCase & UpperCase
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(num)}
                    &nbsp; Number (0-9)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(sChar)}
                    &nbsp; Special Character (!@#$%^&*)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(passLength)}
                    &nbsp; At least 6 Character
                  </span>
                </li>
              </ul>
            </Card>
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Register
            </button>
            <span className={styles.register}>
              <Link to='/'>Home</Link>
              <p>&nbsp; Already have an acount ? &nbsp;</p>
              <Link to='/login'>Login</Link>
            </span>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
