import Card from '../../components/card/Card';
import { MdPassword } from 'react-icons/md';

import { Link } from 'react-router-dom';

import styles from './auth.module.scss';
import { useState } from 'react';
import PasswordInput from '../../components/passwordInput/PasswordInput';

const initailState = {
  password: '',
  confirmPassword: '',
};

const Reset = () => {
  const [resetPassData, setResetPassData] = useState(initailState);

  const { password, confirmPassword } = resetPassData;

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setResetPassData({ ...resetPassData, [name]: value });
  };
  const loginUser = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <MdPassword size={35} color='#999' />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={loginUser}>
            <PasswordInput
              name='password'
              value={password}
              placeholder='New Password'
              onChange={handleInputChange}
            />
            <PasswordInput
              name='confirmPassword'
              value={confirmPassword}
              placeholder='Confirm Password'
              onChange={handleInputChange}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to='/'> -Home</Link>
              </p>
              <p>
                <Link to='/Login'> -Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
