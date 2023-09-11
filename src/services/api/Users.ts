import Api from './Api';

class Users extends Api {
  static getUsers() {
    return Users.makeRequest({ path: '/pokemon/ditto' });
  }
}

export default Users;
