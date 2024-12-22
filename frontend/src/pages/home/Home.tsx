import loginImg from '../../assets/login.svg';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/signup');
  };
  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <section className='container home'>
        <div className='home-text'>
          <h1> Authentication System</h1>
          <div className='home-buttons --flex-center'>
            <button className='--btn --btn-danger' onClick={goToRegister}>
              Register
            </button>
            <button className='--btn --btn-primary' onClick={goToLogin}>
              Login
            </button>
          </div>
        </div>
        <div className='home-image'>
          <img src={loginImg} alt='auth' />
        </div>
      </section>
    </>
  );
};

export default Home;
