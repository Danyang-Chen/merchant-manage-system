import React, { Fragment, useEffect, useState } from 'react';
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
} from 'antd';
import styles from './style.less';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import MerchantDetail from './MerchantDetail';

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

const Merchant = () => {
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

  function confirm(e) {
    console.log(e);
    message.success('确认删除');
  }

  function cancel(e) {
    console.log(e);
    message.error('取消删除');
  }

  return (
    <Fragment>
      <Card style={{ marginBottom: 24 }}>
        <Form>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="name" label="商家名称">
                <Input placeholder="查询店名" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="商家品类">
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
              <Form.Item name="manager" label="商家负责人">
                <Input placeholder="查询负责人" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="telephone" label="联系方式">
                <Input placeholder="查询联系方式" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="endDate" label="截止日期">
                <DatePicker picker="month" style={{ width: '100%' }} />
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
                  onConfirm={confirm}
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

              <div>
                <Tag color="magenta" className={styles.tag}>
                  食品
                </Tag>
                <Tag color="cyan" className={styles.tag}>
                  美发
                </Tag>
              </div>

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

export default Merchant;
