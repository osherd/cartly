import Card from '../../components/card/Card';
import { GrInsecure } from 'react-icons/gr';

import { Link } from 'react-router-dom';

import styles from './auth.module.scss';
import { useState } from 'react';

const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState<string>('');

  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <GrInsecure size={35} color='#999' />
          </div>
          <h2>Enter Access Code</h2>
          <form onSubmit={loginUser}>
            <input
              type='text'
              name='accessCode'
              value={loginCode}
              placeholder='Access Code'
              onChange={(e) => setLoginCode(e.target.value)}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Proceed To Login
            </button>
            <span className='--flex-center'>
              Check your email for login access code
            </span>
            <div className={styles.links}>
              <p>
                <Link to='/'> -Home</Link>
              </p>
              <p className='v-link --color-primary'>
                <b> Resend Code</b>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default LoginWithCode;
