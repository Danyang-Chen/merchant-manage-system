import React, { Fragment, useState, useEffect } from 'react';
import { Table, Tag, Space, Popconfirm, message } from 'antd';
import axios from 'axios';

const Manager = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/managers').then((res) => {
      setData(res.data.data);
      console.log(res);
    });
  }, []);

  function confirm(e) {
    console.log(e);
    message.success('确认删除');
  }

  function cancel(e) {
    console.log(e);
    message.error('取消删除');
  }

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
    },
    {
      title: '店铺所属',
      dataIndex: 'merchantList',
    },
    {
      title: '品类所属',
      dataIndex: 'category',
    },
    {
      title: '功能',
      dataIndex: 'action',
      render: (text) => (
        <Space size="middle">
          <a>编辑</a>
          <Popconfirm
            title="确定删除该负责人?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // const data = [
  //   {
  //     name: 'xxx',
  //     telnumber: ' 17864289546',
  //     roomname: '校园超市',
  //     tags: '超市',
  //   },
  // ];

  return (
    <Fragment>
      <Table columns={columns} dataSource={data} />
    </Fragment>
  );
};

export default Manager;
