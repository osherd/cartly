import Card from '../../components/card/Card';
import './ChangePassword.scss';
import { useState } from 'react';
import PageMenu from '../../components/pageMenu/PageMenu';
import PasswordInput from '../../components/passwordInput/PasswordInput';

const initialState = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState);

  const { currentPassword, newPassword, confirmNewPassword } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                <form>
                  <p>
                    <label>Current Password:</label>
                    <PasswordInput
                      name='currentPassword'
                      value={currentPassword}
                      placeholder='Current Password'
                      onChange={handleInputChange}
                      onPaste={() => {}}
                    />
                  </p>

                  <p>
                    <label>New Password:</label>
                    <PasswordInput
                      name='newPassword'
                      value={newPassword}
                      placeholder='New Password'
                      onChange={handleInputChange}
                      onPaste={() => {}}
                    />
                  </p>
                  <p>
                    <label>Confirm New Password:</label>
                    <PasswordInput
                      name='confirmNewPassword'
                      value={confirmNewPassword}
                      placeholder='Confirm New Password'
                      onChange={handleInputChange}
                      onPaste={() => {}}
                    />
                  </p>

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
