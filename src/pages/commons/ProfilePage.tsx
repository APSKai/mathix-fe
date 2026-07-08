import React, { useEffect, useState } from 'react'

import { Avatar, Button, Card, Form, Input, Select, notification } from 'antd'

import { ReloadOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import { ROLES, TEAMS } from '@/constants/role'
import { getCurrentUserAction } from '@/stores/auth/authAction'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const [activeTabKey, setActiveTabKey] = useState<string>('profile')
    const [form] = Form.useForm()
    const [passwordForm] = Form.useForm()
    const currentUser = useSelector((state: any) => state.auth.user)
    const tabListNoTitle = [
        {
            key: 'profile',
            label: 'User Info',
        },
        {
            key: 'password',
            label: 'Password',
        },
    ]

    useEffect(() => {
        if (currentUser) {
            form.setFieldsValue(currentUser)
        }
    }, [currentUser])

    const onTabChange = (key: string) => {
        setActiveTabKey(key)
    }

    const handleUpdateProfile = async (values: any) => {
        try {
            let res: any
            if (res.status === 200) {
                notification.success({
                    message: 'Update user information successfully',
                })
                dispatch(getCurrentUserAction())
            } else {
                notification.warning({
                    // @ts-ignore
                    message: res.message,
                })
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            notification.error({
                message: 'Update user information failed',
            })
        }
    }

    const handleChangePassword = async (values: any) => {
        if (values.newPassword !== values.confirmPassword) {
            return notification.error({
                message: 'Confirm password is not match',
            })
        }
        try {
            let res: any
            if (res.status === 200) {
                notification.success({
                    message: 'Change password successfully',
                })
            } else {
                notification.error(res.data)
            }
            passwordForm.resetFields()
        } catch (error) {
            console.error('Error changing password:', error)
            notification.error({
                message: 'Change password failed',
            })
        }
    }

    const contentListNoTitle: Record<string, any> = {
        profile: (
            <div>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={currentUser}
                    onFinish={handleUpdateProfile}
                    style={{ marginTop: 24, maxWidth: 500 }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '24px',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            style={{ width: 100, height: 100 }}
                            icon={<UserOutlined style={{ fontSize: 50 }} />}
                        />
                    </div>
                    <br />
                    <Form.Item
                        name="full_name"
                        label="Full name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your full name',
                            },
                        ]}
                    >
                        <Input placeholder="Input your full name" />
                    </Form.Item>
                    <Form.Item name="operator_id" label="Username">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="access_level" label="Access level">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please choose your team',
                            },
                        ]}
                        name="team_id"
                        label="Team"
                    >
                        <Select allowClear placeholder="Choose a team">
                            {TEAMS.map((team) => (
                                <Select.Option value={team.team_id}>
                                    {team.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="role_id" label="Role">
                        <Select disabled allowClear placeholder="Choose a role">
                            {ROLES.map((role) => (
                                <Select.Option value={role.role_id}>
                                    {role.role_name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button
                            type="default"
                            style={{ marginLeft: 8 }}
                            onClick={() => form.resetFields()}
                        >
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        ),
        password: (
            <div>
                <Form
                    style={{ marginTop: 24, maxWidth: 500 }}
                    layout="vertical"
                    form={passwordForm}
                    onFinish={handleChangePassword}
                >
                    <Form.Item
                        name="oldPassword"
                        label="Current password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your current password',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Input your current password" />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        label="New password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Input your new password" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your confirm password',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Input your confirm password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Change password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        ),
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Card
                style={{ width: '100%', height: '100%' }}
                tabList={tabListNoTitle}
                activeTabKey={activeTabKey}
                tabBarExtraContent={
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={() => {}}
                        type="link"
                    >
                        Refresh
                    </Button>
                }
                onTabChange={onTabChange}
                tabProps={{
                    size: 'middle',
                }}
            >
                {contentListNoTitle[activeTabKey]}
            </Card>
        </div>
    )
}

export default ProfilePage
