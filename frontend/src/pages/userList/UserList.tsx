import PageMenu from '../../components/pageMenu/PageMenu';
import Search from '../../components/search/Search';
import UsersStats from '../../components/userStats/UsersStats';
import { FaTrashAlt } from 'react-icons/fa';

import './UserList.scss';
import ChangeRole from '../../components/changeRole/ChangeRole';

const UserList = () => {

  return (
    <section>
      <div className='container'>
        <PageMenu />
        <UsersStats />
        <div className='user-list'>
          <div className='table'>
            <div className='--flex-between'>
              <span>
                <h3>All Users</h3>
              </span>
              <span>
                <Search value='' onChange={() => {}} />
              </span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Change Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Test</td>
                  <td>test@gmail.com</td>
                  <td>Admin</td>
                  <td>
                    <ChangeRole />
                  </td>
                  <td>
                    <span>
                      <FaTrashAlt size={20} color='red' />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserList;
