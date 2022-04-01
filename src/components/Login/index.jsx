import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Checkbox, message } from 'antd';
import axios from 'axios';

const Login = () => {
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);

  const currentUser = localStorage.getItem('currentUser');

  useEffect(() => {
    if (currentUser) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  }, [currentUser]);

  useEffect(() => {
    form.setFieldsValue({
      username: 'admin',
      password: 'admin',
    });
  }, []);

  const handleOK = () => {
    form.submit();
  };

  const handleReset = () => {
    form.resetFields();
    message.warning('请登录后查看系统');
  };

  const handleSubmit = (fields) => {
    const { username, password } = fields;
    axios.post('/api/login', { username, password }).then((response) => {
      if (response.data.respCode === 200) {
        const { currentUser } = response.data;
        localStorage.setItem('currentUser', currentUser.username);
        message.success('登录成功');
        setModalVisible(false);
      } else {
        message.error('登陆失败');
      }
    });
  };

  return (
    <Modal
      title="登录"
      visible={modalVisible}
      onOk={handleOK}
      onCancel={handleReset}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={handleSubmit}
      >
        <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="密码" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }} name="rememberMe">
          <Checkbox>下次自动登录</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Login;
