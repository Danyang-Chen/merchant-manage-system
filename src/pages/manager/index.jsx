import React, { Fragment, useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Space,
  Popconfirm,
  message,
  Layout,
  Select,
  Button,
  Input,
} from 'antd';
import axios from 'axios';
import styles from './style.css';
import { PlusOutlined } from '@ant-design/icons';

const { Header } = Layout;

const { Search } = Input;

const onSearch = (value) => console.log(value);

const options = [
  { value: '食物', color: 'gold' },
  { value: '超市', color: 'lime' },
  { value: '饮品', color: 'green' },
  { value: '快递', color: 'cyan' },
  { value: '电子产品', color: 'blue' },
  { value: '医药', color: 'green' },
  { value: '美容美发', color: 'pink' },
  { value: '洗衣店', color: 'blue' },
  { value: 'blue', color: 'blue' },
];

function tagRender(props) {
  const { label, value, closable, onClose, color } = props;
  const onPreventMouseDown = (event) => {
    // event.preventDefault();
    // event.stopPropagation();
  };
  return (
    <Tag
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}

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
      title: '所属店铺',
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
      <Header className={styles.header}>
        <Search
          placeholder="查询店名、负责人、电话"
          allowClear
          onSearch={onSearch}
          className={styles.search}
        />

        <Select
          mode="tags"
          allowClear
          placeholder="筛选品类"
          options={options} //数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能	{ label, value }[]
          tagRender={tagRender}
          className={styles.select}
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          className={styles.button}
        >
          添加负责人
        </Button>
      </Header>
      <Table columns={columns} dataSource={data} />
    </Fragment>
  );
};

export default Manager;
