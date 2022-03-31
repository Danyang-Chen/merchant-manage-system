import React, { Fragment, useEffect, useState } from 'react';
import {
  List,
  Avatar,
  Layout,
  Button,
  Pagination,
  PageHeader,
  message,
} from 'antd';
import styles from './style.less';
import { PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Footer } = Layout;

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

  return (
    <Fragment>
      {/* <Header className={styles.header}>
        <h2>商家管理</h2>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          className={styles.button}
        >
          添加商家
        </Button>
      </Header> */}

      <List
        className={styles.list}
        header="商家管理"
        itemLayout="horizontal"
        dataSource={data}
        pagination={{ showQuickJumper: true }}
        renderItem={(item) => (
          <List.Item actions={[<a>详细</a>, <a>删除</a>]}>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={item.name}
              description={item.address}
            />

            <div className={styles.listItemData}>
              <span>负责人</span>
              <p>{item.manager}</p>
            </div>
            <div className={styles.listItemData}>
              <div>联系电话</div>
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
