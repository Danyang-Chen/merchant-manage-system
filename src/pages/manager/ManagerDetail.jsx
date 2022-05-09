import React, { useState, useEffect } from 'react';
import { Modal, Space, Button } from 'antd';
import styles from './style.less';

const ManagerDetail = (props) => {
  const { dataSource, visible, onCancel } = props;

  const [mode, setMode] = useState(dataSource ? 'readOnly' : 'write');

  const handleSave = () => {
    setMode('readOnly');
    form.submit();
  };

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

  return (
    <Modal title={buttonGroup} visible="true">
      ceshi
    </Modal>
  );
};

export default ManagerDetail;
