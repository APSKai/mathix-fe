import { useEffect, useState } from 'react'

import {
    Avatar,
    Button,
    Card,
    Form,
    Input,
    Tag,
    Typography,
    notification,
} from 'antd'

import {
    EditOutlined,
    MailOutlined,
    SaveOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import UserService from '@/services/user'
import { getCurrentUserAction } from '@/stores/auth/authAction'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state: any) => state.auth.user)
    const [form] = Form.useForm()
    const [editing, setEditing] = useState(false)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (currentUser) form.setFieldsValue({ fullName: currentUser.fullName })
    }, [currentUser, form])

    const save = async (values: { fullName: string }) => {
        if (!currentUser?.uid) return
        setSaving(true)
        try {
            await UserService.update(currentUser.uid, values)
            await dispatch(getCurrentUserAction() as any)
            setEditing(false)
            notification.success({ message: 'Đã cập nhật hồ sơ' })
        } catch (error: any) {
            notification.error({
                message: 'Không thể cập nhật hồ sơ',
                description:
                    error?.response?.data?.message || 'Vui lòng thử lại.',
            })
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="profile-page">
            <section className="profile-hero">
                <div>
                    <Typography.Text className="eyebrow">
                        HỒ SƠ CÁ NHÂN
                    </Typography.Text>
                    <Typography.Title>Thông tin của bạn</Typography.Title>
                    <Typography.Paragraph type="secondary">
                        Giữ hồ sơ luôn chính xác để kết quả học tập được hiển
                        thị đúng trên Mathix.
                    </Typography.Paragraph>
                </div>
                <Avatar
                    size={92}
                    src={currentUser?.avatar}
                    icon={<UserOutlined />}
                />
            </section>
            <Card className="profile-card">
                <div className="profile-card__heading">
                    <div>
                        <Typography.Title level={3}>
                            Thông tin tài khoản
                        </Typography.Title>
                        <Typography.Text type="secondary">
                            Các trường định danh được quản lý bởi Firebase.
                        </Typography.Text>
                    </div>
                    {!editing && (
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => setEditing(true)}
                        >
                            Chỉnh sửa
                        </Button>
                    )}
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={save}
                    className="profile-form"
                >
                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ và tên',
                            },
                        ]}
                    >
                        <Input disabled={!editing} size="large" />
                    </Form.Item>
                    <div className="profile-readonly-grid">
                        <div>
                            <span>
                                <UserOutlined /> Tên đăng nhập
                            </span>
                            <strong>{currentUser?.username || '—'}</strong>
                        </div>
                        <div>
                            <span>
                                <MailOutlined /> Địa chỉ email
                            </span>
                            <strong>{currentUser?.email || '—'}</strong>
                        </div>
                        <div>
                            <span>Vai trò</span>
                            <strong>
                                <Tag
                                    color={
                                        currentUser?.role === 'admin'
                                            ? 'gold'
                                            : 'blue'
                                    }
                                >
                                    {currentUser?.role === 'admin'
                                        ? 'Quản trị viên'
                                        : 'Học viên'}
                                </Tag>
                            </strong>
                        </div>
                    </div>
                    {editing && (
                        <div className="profile-actions">
                            <Button
                                onClick={() => {
                                    setEditing(false)
                                    form.resetFields()
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                loading={saving}
                            >
                                Lưu thay đổi
                            </Button>
                        </div>
                    )}
                </Form>
            </Card>
        </div>
    )
}

export default ProfilePage
