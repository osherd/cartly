import { BiLogIn } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Header.scss';
import {
  selectName,
  SET_LOGIN,
} from '../../redux/store/features/auth/authSlice';
import { logoutUser } from '../../services/authService';
import { NavLinkRenderProps } from 'react-router-dom';

const activeLink = ({ isActive }: NavLinkRenderProps) =>
  isActive ? 'active' : '';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName) as string;

  const goHome = () => {
    navigate('/');
  };
  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate('/login');
  };

  return (
    <header className='header'>
      <nav>
        <div className='logo' onClick={goHome}>
          <BiLogIn size={35} />
          <span>AuthMaster</span>
        </div>
        <ul className='home-links'>
          <li className='--flex-center'>
            <FaUserCircle size={20} />
            <p className='--color-white'>Hi {name} |</p>
          </li>
          <li>
            <button className='--btn --btn-primary'>
              <Link to='/login'>Login</Link>
            </button>
          </li>
          <li>
            <NavLink to='/profile' className={activeLink}>
              Profile
            </NavLink>
          </li>
          <li>
            <button onClick={logout} className='--btn --btn-secondary'>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
