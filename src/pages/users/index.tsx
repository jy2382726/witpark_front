import { Card, Row, Col, Input, Button, Table, TableProps, Tag, Popconfirm, message } from "antd";
import { ChangeEvent, useEffect, useCallback, useMemo, useState } from "react";
import type { DataType } from "./interface";
import { getUserList, SearchParams, deleteUser, deleteUserList, updateUser, addUser } from "../../api/userList";
import UserForm from "./userFormData";


const Users: React.FC = () => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'No.',
      key: 'index',
      width: 50,
      fixed: 'left',
      render: (text, record, index) => index + 1,
    },
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '经营状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === '1' ? 'green' : status === '2' ? 'orange' : 'red'}>
          {status === '1' ? '营业中' : status === '2' ? '暂停营业' : '已关闭'}
        </Tag>
      ),
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '所属行业',
      dataIndex: 'business',
      key: 'business',
    },
    {
      title: '联系邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '统一信用代码',
      dataIndex: 'creditCode',
      key: 'creditCode',
    },
    {
      title: '工商注册号',
      dataIndex: 'industryNo',
      key: 'industryNo',
    },
    {
      title: '组织机构代码',
      dataIndex: 'organizationCode',
      key: 'organizationCode',
    },
    {
      title: '法人名',
      dataIndex: 'legalPerson',
      key: 'legalPerson',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 145,
      fixed: 'right',
      render: (value, record) => (
        <div>
          <Button type="primary" size="small" onClick={() => editUser(record)}>编辑</Button>
          <Popconfirm title="确认删除吗？" onConfirm={() => handleDelete(record.id)}>
            <Button type="primary" danger size="small" className="ml">删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<DataType>();
  const [params, setParams] = useState<SearchParams>({
    page: 1,
    pageSize: 10,
    companyName: '',
    contact: '',
    phone: '',
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // 定义一个计算属性作为判断是否有选中的行

  const disabled = useMemo<boolean>(() => selectedRowKeys.length < 1, [selectedRowKeys]);
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getUserList(params);
      setDataSource(res.data.list);
      setTotal(res.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const editUser = (record: DataType) => {
    setVisible(true);
    setFormData(record);
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  }

  const handleSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  }
  const handlePageChange = (page: number, pageSize: number) => {
    setParams({
      ...params,
      page,
      pageSize,
    });
  }
  const handleReset = () => {
    setParams({
      page: 1,
      pageSize: 10,
      companyName: '',
      contact: '',
      phone: '',
    });
    setSelectedRowKeys([]);
  }
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const res = await deleteUser({
        id,
      });
      setLoading(false);
      message.success(res.message);
      loadData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleDeleteBatch = async () => {
    try {
      setLoading(true);
      const res = await deleteUserList({
        ids: selectedRowKeys.map(id => id.toString()),
      });
      setLoading(false);
      message.success(res.message);
      setSelectedRowKeys([]);
      loadData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    loadData();
  }, [params.page, params.pageSize]);
  return (
    <div className="users">
      <Card className="search-card">
        <Row gutter={16}>
          <Col span={7}>
            <p>企业名称:</p>
            <Input name="companyName" placeholder="请输入企业名称" onChange={handleChange} value={params.companyName} />
          </Col>
          <Col span={7}>
            <p>联系人:</p>
            <Input name="contact" placeholder="请输入联系人" onChange={handleChange} value={params.contact} />
          </Col>
          <Col span={7}>
            <p>联系电话:</p>
            <Input name="phone" placeholder="请输入联系电话" onChange={handleChange} value={params.phone} />
          </Col>
          <Col span={3}>
            <Button type="primary" onClick={loadData}>查询</Button>
            <Button className="ml" onClick={handleReset}>重置</Button>
          </Col>
        </Row>
      </Card>
      <Card className="mt tr">
        <Button type="primary" onClick={() => setVisible(true)}>新增企业</Button>
        <Popconfirm
          title="删除确认"
          description="确认删除所有选中的企业吗？"
          okText="确认"
          okType="danger"
          onConfirm={handleDeleteBatch}
        >
          <Button className="ml" type="primary" disabled={disabled} danger>批量删除</Button>
        </Popconfirm>
      </Card>
      <Card className="mt">
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={(record) => record.id}
          pagination={{
            total: total,
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
            showQuickJumper: true,
            current: params.page,
            pageSize: params.pageSize,
            onChange: handlePageChange,
          }}
          loading={loading}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedRowKeys,
            onChange: handleSelectChange,
          }}
        />
      </Card>
      <UserForm 
        title={useMemo(() => formData?.id ? '编辑用户' : '新增用户', [formData?.id])}
        visible={visible} 
        onCancel={useCallback(() => {
          setVisible(false);
          setFormData(undefined);
        }, [])} 
        formData={formData} 
        onOk={useCallback(async (formData: DataType) => {
          console.log("提交表单数据ID", formData.id);
          try {
            setLoading(true);
            const res = await (formData.id ? updateUser(formData) : addUser(formData));
            setLoading(false);
            message.success(res.message);
            setVisible(false);
            setFormData(undefined);
            loadData();
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        }, [])}
      />
    </div>
  );
}

export default Users;