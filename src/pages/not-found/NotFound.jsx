import React, { Component } from 'react';
import { Button, Result } from 'antd';

class NotFound extends Component {
  goBack=()=>{
    this.props.history.replace('/home')
  }
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="お探しのページが見つかりませんでした"
        extra={<Button type="primary"　onClick={this.goBack}>ホームに戻る</Button>}
      />
    );
  }
}

export default NotFound;
