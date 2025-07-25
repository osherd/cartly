import Card from '../../components/card/Card';
import './ChangePassword.scss';
import { useState } from 'react';
import PageMenu from '../../components/pageMenu/PageMenu';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import {
  selectUser,
  SET_LOGIN,
  SET_USER,
} from '../../redux/store/features/auth/authSlice';

import { changePassword } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};
interface ChangePasswordResponse {
  name: string;
  email: string;
}

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [_, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const loggedinUserdata = useSelector(selectUser);

  const { currentPassword, newPassword, confirmNewPassword } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const passwordChange = async (e: React.FormEvent) => {
    if (!loggedinUserdata) {
      toast.error('User not found. Please log in again.');
      return;
    }

    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match');
      return;
    } else if (newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }
    setIsLoading(true);


    const passwordChangeData = {
      currentPassword,
      newPassword,
      email:loggedinUserdata.email,
      name: loggedinUserdata.name
    };

    try {
      const response = await changePassword(passwordChangeData);
      const data =
        typeof response === 'string'
          ? (JSON.parse(response) as ChangePasswordResponse)
          : (response as unknown as ChangePasswordResponse);
      dispatch(SET_LOGIN(true));
      dispatch(SET_USER(passwordChangeData));
      if (!data) {
        toast.error('Failed to change password');
      }
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password. Please try again.');
    }
  };
  return (
    <>
      <section>
        <div className='container'>
          <PageMenu />
          <h2 className='--text-center'>Change Password</h2>
          <div className='--flex-center change-password'>
            <Card cardClass={'card'}>
              <>
                <form onSubmit={passwordChange}>
                  <div>
                    <label>Current Password:</label>
                    <PasswordInput
                      name='currentPassword'
                      value={currentPassword}
                      placeholder='Current Password'
                      onChange={handleInputChange}
                      onPaste={() => {}}
                    />
                  </div>

                  <div>
                    <label>New Password:</label>
                    <PasswordInput
                      name='newPassword'
                      value={newPassword}
                      placeholder='New Password'
                      onChange={handleInputChange}
                      onPaste={() => {}}
                    />
                  </div>
                  <div>
                    <label>Confirm New Password:</label>
                    <PasswordInput
                      name='confirmNewPassword'
                      value={confirmNewPassword}
                      placeholder='Confirm New Password'
                      onChange={handleInputChange}
                      onPaste={() => {}}
                    />
                  </div>

                  <button className='--btn --btn-danger --btn-block'>
                    Change Password
                  </button>
                </form>
              </>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
