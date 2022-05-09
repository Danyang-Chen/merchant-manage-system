import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'dva';
import {
  List,
  Avatar,
  Card,
  Layout,
  Button,
  Row,
  Col,
  DatePicker,
  Pagination,
  PageHeader,
  Popconfirm,
  Form,
  message,
  Tag,
  Input,
  Select,
  Badge,
  Radio,
  Cascader,
} from 'antd';
import styles from './style.less';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import MerchantDetail from './MerchantDetail';

// const options = [
//   { value: '食物', color: 'gold' },
//   { value: '超市', color: 'lime' },
//   { value: '饮品', color: 'green' },
//   { value: '快递', color: 'cyan' },
//   { value: '电子产品', color: 'blue' },
//   { value: '医药', color: 'green' },
//   { value: '美容美发', color: 'pink' },
//   { value: '洗衣店', color: 'blue' },
// ];

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

const Merchant = (props) => {
  const { categoryList } = props;

  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get('/api/merchants').then((response) => {
      if (response.data.respCode === 200) {
        setData(response.data.data);
      } else {
        message.error(response.data.data);
      }
    });
  }, []);

  const handleDelete = (itemId) => {
    axios.delete(`/api/merchants/${itemId}`).then((response) => {
      console.log(response.data);
      message.success('确认删除');
    });
  };

  function cancel(e) {
    console.log(e);
    message.error('取消删除');
  }

  const tagsoptions = categoryList.map((category) => {
    return {
      value: category.name,
      color: category.color,
    };
  });

  const cascaderoptions = [
    {
      value: '东区',
      label: '东区',
      children: [
        {
          value: 'D1公寓',
          label: 'D1公寓',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: '北区',
      label: '北区',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

  function onChange(value) {
    console.log(value);
  }

  return (
    <Fragment>
      <Card style={{ marginBottom: 24 }}>
        <Form>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="name" label="店铺名称">
                <Input placeholder="查询店名" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="adress" label="店铺地址">
                <Cascader
                  options={cascaderoptions}
                  onChange={onChange}
                  changeOnSelect
                  placeholder="选择店铺所在地址"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="所属品类">
                <Select
                  placeholder="选择品类"
                  allowClear
                  mode="tags"
                  options={tagsoptions}
                  tagRender={tagRender}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="manager" label="店铺负责人">
                <Input placeholder="查询负责人" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="telephone" label="查找电话">
                <Input placeholder="查询负责人联系电话" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="endDate" label="截止日期">
                <DatePicker picker="month" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="hire" label="店铺是否占用">
                <Radio.Group>
                  <Radio value="a">是</Radio>
                  <Radio value="b">否</Radio>
                  <Radio value="c">全选</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={16}>
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
            onClick={() => setModalVisible(true)}
          >
            添加商家
          </Button>
        }
      >
        <List
          className={styles.list}
          itemLayout="horizontal"
          dataSource={data}
          pagination={{ showQuickJumper: true }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedItem(item);
                  }}
                >
                  详细
                </a>,
                <Popconfirm
                  title="确定删除该商家?"
                  onConfirm={() => handleDelete(item.id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <a>删除</a>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.name}
                description={item.address}
              />
              <Badge offset={[5, 5]}>
                <Tag
                  color="magenta"
                  // className={styles.tag}
                >
                  食品
                </Tag>
              </Badge>

              <div className={styles.listItemData}>
                <span>负责人</span>
                <p>{item.manager}</p>
              </div>

              <div className={styles.listItemData}>
                <div>负责人联系电话</div>
                <div>{item.phone}</div>
              </div>
              <div className={styles.listItemData}>
                <div>截止日期</div>
                <div>{item.endDate}</div>
              </div>
            </List.Item>
          )}
        />
      </Card>

      <MerchantDetail
        dataSource={selectedItem}
        visible={modalVisible}
        onCancel={setModalVisible}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  categoryList: state.category.categoryList,
});

export default connect(mapStateToProps)(Merchant);
