import { Modal, Input, Form, Col, Row, Radio, message } from "antd";
import { DataType } from "./interface";
import React, { useEffect } from "react";

interface UserFormProps {
    visible: boolean;
    title?: string;
    formData?: DataType;
    onCancel: () => void;
    onOk: (values: DataType) => void;
}

const UserForm: React.FC<UserFormProps> = ({ visible, title = '用户信息', formData, onCancel, onOk }) => {
    // console.log("子组件更新了！！");
    const [form] = Form.useForm<DataType>();
    useEffect(() => {
        // 只在Modal可见时操作form实例，避免警告
        if (visible) {
            // 当formData为undefined或没有id时（新增模式），重置表单
            if (!formData || !formData.id) {
                form.resetFields();
            } else {
                // 有formData且有id时设置字段值（编辑模式）
                form.setFieldsValue(formData);
            }
        }
    }, [form, formData, visible]);

    // 优化：移除可能导致警告的useEffect，因为当Modal关闭时Form组件已不存在
    // 当Modal再次打开时，React.memo和visible状态变化会确保正确处理表单状态
    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                onOk(values);
            })
            .catch((error) => {
                // 处理表单验证失败的情况，避免应用崩溃
                console.log('表单验证失败:', error);
                // 可以选择在这里添加额外的错误处理逻辑
                message.error('请填写完整信息');
            });
    };
    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            onOk={handleOk}
            title={title}
            width={900}
        >
            <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                <Form.Item name="id" label="用户ID" hidden>
                    <Input />
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="name" label="客户名称" rules={[{ required: true, message: '请输入客户名称' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="status" label="经营状态" rules={[{ required: true, message: '请选择经营状态' }]}>
                            <Radio.Group>
                                <Radio value={"1"}>营业中</Radio>
                                <Radio value={"2"}>暂停营业</Radio>
                                <Radio value={"3"}>已关闭</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="business" label="所属行业" rules={[{ required: true, message: '请输入所属行业' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="email" label="联系邮箱" rules={[{ required: true, message: '请输入联系邮箱' }, { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的邮箱格式' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="creditCode" label="统一信用代码" rules={[{ required: true, message: '请输入统一信用代码' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="industryNo" label="工商注册号" rules={[{ required: true, message: '请输入工商注册号' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="organizationCode" label="组织机构代码" rules={[{ required: true, message: '请输入组织机构代码' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="legalPerson" label="法人名" rules={[{ required: true, message: '请输入法人名' }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </Modal>
    );
};

// 使用React.memo并提供自定义比较函数来优化渲染性能
export default React.memo(UserForm, (prevProps, nextProps) => {
    // 如果visible没有变化，并且formData的id没有变化，则认为组件不需要重新渲染
    if (prevProps.visible === nextProps.visible &&
        prevProps.formData?.id === nextProps.formData?.id &&
        prevProps.title === nextProps.title) {
        return true;
    }
    return false;
});
