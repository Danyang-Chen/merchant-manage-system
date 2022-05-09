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
  Card,
  Form,
  Row,
  Col,
  DatePicker,
} from 'antd';
import axios from 'axios';
import styles from './style.less';
import { PlusOutlined } from '@ant-design/icons';
// import ManagerDetail from './ManagerDetail';

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
    });
  }, []);

  function confirm(e) {
    message.success('确认删除');
  }

  function cancel(e) {
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

  return (
    <Fragment>
      {/* <ManagerDetail/> */}
      <Card style={{ marginBottom: 24 }}>
        <Form>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="name" label="店员姓名">
                <Input placeholder="查询姓名" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="telephone" label="联系方式">
                <Input placeholder="查询联系方式" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="店员身份证">
                <Input placeholder="查询身份证号码" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="manager" label="所属店铺">
                <Input placeholder="查询店铺名称" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="负责品类">
                <Select
                  placeholder="选择品类"
                  allowClear
                  mode="tags"
                  options={options}
                  tagRender={tagRender}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Button type="primary" className={styles.searchBtn}>
                查询
              </Button>
              <Button className={styles.resetBtn}>重置</Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className={styles.button}
            // onClick={() => setModalVisible(true)}
          >
            添加商家
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} />
      </Card>
    </Fragment>
  );
};

export default Manager;
