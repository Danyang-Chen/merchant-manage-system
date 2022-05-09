import React, { Fragment } from 'react';
import { Card, Row, Col, Menu, Avatar, Tabs } from 'antd';
import styles from './style.css';

const { TabPane } = Tabs;

const Introduce = () => {
  function callback(key) {
    console.log(key);
  }

  return (
    <Fragment>
      <Row gutter={24}>
        <Col span={8}>
          <Card>
            <Avatar
              src="https://joeschmoe.io/api/v1/random"
              size={100}
              className={styles.avatar}
            />
            <div>早安,Aelia！</div>
          </Card>
        </Col>

        <Col span={16}>
          <Card>
            <Tabs
              defaultActiveKey="1"
              onChange={callback}
              tabBarGutter={60}
              // centered
              size={'large'}
            >
              <TabPane tab="系统介绍" key="1">
                校园内商家我们会关注的几个问题
                1、大多商铺店员为校外人员，管理有一定问题，所以有“店员管理”功能，校外人员只有录入这个系统可以进入校园
                2、校内空闲房屋的统计，“房屋管理”，管理房屋租期，之后可添加水电费等后勤工作
                3、
              </TabPane>
              <TabPane tab="使用说明" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="系统优化" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Introduce;
