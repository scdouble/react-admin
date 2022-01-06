import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect } from 'react-router-dom';
class Admin extends Component {

  render() {
    const user = memoryUtils.user

    // メモリにログインのユーザデータがなければ
    if (!user || !user._id) {
      // loginに遷移
      return <Redirect to="/login" />
    }
    return (
      <div>
        <h2>Admin page</h2>
        Hello {user.username} !!
      </div>
    );
  }
}

export default Admin;
