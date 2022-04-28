import React, { Fragment, useEffect, useState } from 'react';
import {
  List,
  Avatar,
  Layout,
  Button,
  Pagination,
  PageHeader,
  Popconfirm,
  message,
  Tag,
  Input,
  Select,
} from 'antd';
import styles from './style.less';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

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

const Merchant = () => {
  const [data, setData] = useState([]);

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
          添加商家
        </Button>
      </Header>

      <List
        className={styles.list}
        itemLayout="horizontal"
        dataSource={data}
        pagination={{ showQuickJumper: true }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a>详细</a>,
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
    </Fragment>
  );
};

export default Merchant;
