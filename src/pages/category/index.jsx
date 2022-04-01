import React, { Fragment, useEffect, useState } from 'react';
import { Card, Layout, Row, Col, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './style.less';
import axios from 'axios';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3293117_18nxlww2hjq.js',
});

const { Header } = Layout;
const { Meta } = Card;

const Category = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/categories').then((res) => {
      setData(res.data.data);
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
      {/* <Header className={styles.header}>
        <h2>品类管理</h2>
      </Header> */}

      <Row gutter={[12, 12]}>
        <Col span={6}>
          <Button type="dashed" className={styles.addBtn}>
            <PlusOutlined /> 新增品类
          </Button>
        </Col>
        {data.map((item) => {
          return (
            <Col span={6}>
              <Card
                hoverable
                className={styles.categoryCard}
                actions={[
                  <EditOutlined key="edit" />,

                  <Popconfirm
                    title="确定删除该品类?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined key="deleteoutlined" />
                  </Popconfirm>,
                ]}
              >
                <Meta
                  avatar={
                    <IconFont
                      style={{ fontSize: 40 }}
                      type={`icon-${item.icon}`}
                    />
                  }
                  title={item.name}
                  description="This is the description"
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default Category;
