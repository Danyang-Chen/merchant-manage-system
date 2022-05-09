import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import {
  Modal,
  Form,
  Descriptions,
  Button,
  Space,
  Input,
  Select,
  DatePicker,
  message,
} from 'antd';
import moment from 'moment';
import axios from 'axios';
import styles from './style.less';

// const options = [
//   { value: '食物', color: 'gold' },
//   { value: '超市', color: 'lime' },
//   { value: '饮品', color: 'green' },
//   { value: '快递', color: 'cyan' },
//   { value: '电子产品', color: 'blue' },
//   { value: '医药', color: 'green' },
//   { value: '美容美发', color: 'pink' },
//   { value: '洗衣店', color: 'blue' },
//   { value: 'blue', color: 'blue' },
// ];

const MerchantDetail = (props) => {
  const { dataSource, visible, onCancel, categoryList } = props;

  const [mode, setMode] = useState(dataSource ? 'readOnly' : 'write'); // readOnly | write

  const [detail, setDetail] = useState(dataSource || {});

  const [form] = Form.useForm(); // useRef

  const { name, category, address, startDate, endDate, manager, phone } =
    detail;

  useEffect(() => {
    setMode(dataSource ? 'readOnly' : 'write');
    setDetail(dataSource || {});
  }, [dataSource]);

  const handleEdit = () => {
    setMode('write');
  };

  const handleSave = () => {
    setMode('readOnly');
    form.submit();
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleCancel = () => {
    onCancel(false);
  };

  const handleSubmit = (values) => {
    const { startDate, endDate, ...restValues } = values;

    const fieldsValues = {
      ...restValues,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    };

    if (dataSource) {
      axios
        .put(`/api/merchants/${detail.id}`, fieldsValues)
        .then((response) => {
          setDetail(response.data.data);
        });
    } else {
      axios.post('/api/merchants', fieldsValues).then((response) => {
        setDetail(response.data.data);
      });
    }
  };

  const initialValues = dataSource
    ? {
        name,
        category,
        address,
        startDate: moment(startDate, 'YYYY-MM-DD'),
        endDate: moment(endDate, 'YYYY-MM-DD'),
        manager,
        phone,
      }
    : {};

  const options = categoryList.map((category) => {
    return {
      value: category.name,
      color: category.color,
    };
  });

  const buttonGroup = (
    <div className={styles.modalTitle}>
      <div className={styles.title}>商家管理</div>
      <div className={styles.btnGroup}>
        <Space>
          {mode === 'readOnly' && (
            <Button type="primary" onClick={handleEdit}>
              编辑
            </Button>
          )}
          {mode === 'write' && (
            <Button type="primary" onClick={handleSave}>
              保存
            </Button>
          )}
          {mode === 'write' && <Button onClick={handleReset}>重置</Button>}
          <Button onClick={handleCancel}>返回</Button>
        </Space>
      </div>
    </div>
  );

  const readOnlyContainer = (
    <Descriptions
      bordered
      size="small"
      column={2}
      labelStyle={{ fontWeight: 'bold' }}
    >
      <Descriptions.Item label="商家名称">{name}</Descriptions.Item>
      <Descriptions.Item label="商家品类">{category}</Descriptions.Item>
      <Descriptions.Item label="商家地址" span={2}>
        {address}
      </Descriptions.Item>
      <Descriptions.Item label="起始日期">{startDate}</Descriptions.Item>
      <Descriptions.Item label="截止日期">{endDate}</Descriptions.Item>
      <Descriptions.Item label="负责人">{manager}</Descriptions.Item>
      <Descriptions.Item label="负责人联系方式">{phone}</Descriptions.Item>
    </Descriptions>
  );

  const writeContainer = (
    <Form form={form} initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item name="name" label="商家名称">
        <Input />
      </Form.Item>
      <Form.Item name="category" label="商家品类">
        <Select options={options} />
      </Form.Item>
      <Form.Item name="address" label="商家地址">
        <Input />
      </Form.Item>
      <Form.Item name="startDate" label="开始日期">
        <DatePicker />
      </Form.Item>
      <Form.Item name="endDate" label="截止日期">
        <DatePicker />
      </Form.Item>
      <Form.Item name="manager" label="负责人">
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="联系方式">
        <Input />
      </Form.Item>
    </Form>
  );

  return (
    <Modal
      title={buttonGroup}
      width={800}
      closable={false}
      maskClosable={false}
      visible={visible}
      footer={null}
    >
      {mode === 'readOnly' ? readOnlyContainer : writeContainer}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  categoryList: state.category.categoryList,
});

export default connect(mapStateToProps)(MerchantDetail);
