import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, List, Avatar } from 'antd';
import { ClearOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './style.less';

const NoticeList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/notices').then((response) => {
      if (response.data.respCode === 200) {
        setData(response.data.data);
      }
    });
  }, []);

  const noticeNum = data.reduce((sum, item) => {
    if (!item.status) sum++;
    return sum;
  }, 0);

  const tabList = [{ key: 'notice', tab: <div>消息({noticeNum})</div> }];
  const extraContent = (
    <div className={styles.extra}>
      <ClearOutlined />
      全部已读
    </div>
  );

  return (
    <Card
      className={styles.card}
      size="small"
      tabList={tabList}
      tabBarExtraContent={extraContent}
      bodyStyle={{ padding: 0 }}
    >
      <List
        className={styles.list}
        dataSource={data}
        renderItem={(item) => {
          const leftIcon = (
            <Avatar
              style={{ backgroundColor: item.status ? '#ccc' : '#1890ff' }}
              className={styles.avatar}
              icon={<CheckOutlined />}
            />
          );

          return (
            <List.Item
              className={`${styles.item} ${item.status ? styles.read : {}}`}
            >
              <List.Item.Meta
                avatar={leftIcon}
                title={<div className={styles.title}>{item.title}</div>}
                description={<div className={styles.datetime}>{item.date}</div>}
              />
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default NoticeList;
