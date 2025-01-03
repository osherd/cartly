import Card from '../../components/card/Card';
import profileImg from '../../assets/avatarr.png';
import './Profile.scss';
import { useState } from 'react';
import PageMenu from '../../components/pageMenu/PageMenu';

const initialState = {
  name: 'osh',
  email: 'osh@gmail.com',
  phone: '144545454',
  bio: 'developer',
  photo: '',
  role: 'Admin',
  isVerified: false,
};

const Profile = () => {
  const [profile, setProfile] = useState(initialState);

  const { name, email, phone, bio, photo } = profile;
  const handleImageChange = () => {};
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };
  return (
    <>
      <section>
        <div className='container'>
          <PageMenu />
          <h2>Profile</h2>
          <div className='--flex-start profile'>
            <Card cardClass={'card'}>
              <div className='profile-photo'>
                <div>
                  <img src={profileImg} alt='profileimg' />
                  <h3>Role: Admin </h3>
                </div>
              </div>
              <form>
                <p>
                  <label>Change Photo:</label>
                  <input
                    type='file'
                    accept='image/*'
                    name='image'
                    value={photo}
                    onChange={handleImageChange}
                  />
                </p>
                <p>
                  <label>Name</label>
                  <input
                    type='text'
                    name='name'
                    value={name}
                    onChange={handleInputChange}
                  />
                </p>

                <p>
                  <label>email</label>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleInputChange}
                    disabled
                  />
                </p>
                <p>
                  <label>Phone</label>
                  <input
                    type='text'
                    name='phone'
                    value={phone}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <label>Bio</label>
                  <textarea
                    name='bio'
                    cols={30}
                    rows={10}
                    value={bio}
                    onChange={handleInputChange}
                  ></textarea>
                </p>
                <button className='--btn --btn-primary --btn-block'>
                  Update Profile
                </button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
