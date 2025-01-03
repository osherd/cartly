import './Loader.scss';
import ReactDOM from 'react-dom';
import loaderImg from '../../assets/loader.gif';

const Loader = () => {
  const loaderElement = document.getElementById('loader');
  if (!loaderElement) return null;

  return ReactDOM.createPortal(
    <div className='wrapper'>
      <div className='loader'>
        <img src={loaderImg} alt='Loading...' />
      </div>
    </div>,
    loaderElement
  );
};

export const Spinner = () => {
  return (
    <div className='--center-all'>
      <img src={loaderImg} alt='Loading...' />
    </div>
  );
};

export default Loader;
