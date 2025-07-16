import Card from '../../components/card/Card';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import styles from './auth.module.scss';
import { useState } from 'react';

const Forgot = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = () => {};
  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail((e.target as HTMLFormElement).email.value);
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <AiOutlineMail size={35} color='#999' />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={loginUser}>
            <input
              type='email'
              placeholder='Email'
              name='email'
              required
              value={email}
              onChange={handleInputChange}
            />

            <button type='submit' className='--btn --btn-primary --btn-block'>
              Get Reset Email
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

export default Forgot;
