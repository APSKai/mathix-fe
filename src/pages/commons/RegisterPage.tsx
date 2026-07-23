import { FC, useState } from 'react'

import { Button, Flex, Form, Input, Typography, notification } from 'antd'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RegisterRequest } from '@/interfaces/auth/auth.interface'
import '@/pages/styles/login.css'
import { PATHS } from '@/routers/path'
import { AppDispatch } from '@/stores'
import { registerAction } from '@/stores/auth/authAction'

const { Title } = Typography

const RegisterPage: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [registerLoading, setRegisterLoading] = useState(false)

    const onRegisterFinish = async (values: RegisterRequest) => {
        setRegisterLoading(true)

        try {
            const response = await dispatch(registerAction(values)).unwrap()

            notification.success({
                message: 'Đăng ký thành công!',
                description:
                    response.message || 'Vui lòng đăng nhập để tiếp tục',
                placement: 'bottomRight',
            })
            navigate(PATHS.LOGIN)
        } catch (error: any) {
            notification.error({
                message: 'Đăng ký thất bại!',
                description:
                    error?.message ||
                    'Không thể tạo tài khoản. Vui lòng thử lại',
                placement: 'bottomRight',
            })
        } finally {
            setRegisterLoading(false)
        }
    }

    return (
        <main className="login-page">
            <section className="login-illustration" aria-hidden="true">
                <img src="/login-background.svg" alt="Minh họa đăng ký" />
            </section>

            <section className="login-panel">
                <Flex vertical className="login-form-shell">
                    <Title level={1} className="login-title">
                        ĐĂNG KÝ
                    </Title>

                    <Form
                        colon={false}
                        layout="vertical"
                        onFinish={onRegisterFinish}
                        requiredMark={false}
                        className="login-form"
                    >
                        <Form.Item
                            label="Tên đăng nhập"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên đăng nhập',
                                },
                            ]}
                        >
                            <Input
                                autoComplete="username"
                                placeholder="Nhập tên đăng nhập của bạn"
                                size="large"
                            />
                        </Form.Item>

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
                            <Input
                                autoComplete="name"
                                placeholder="Nhập họ và tên của bạn"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email',
                                },
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ',
                                },
                            ]}
                        >
                            <Input
                                autoComplete="email"
                                placeholder="Nhập email của bạn"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu',
                                },
                                {
                                    min: 6,
                                    message: 'Mật khẩu phải có ít nhất 6 ký tự',
                                },
                            ]}
                        >
                            <Input.Password
                                autoComplete="new-password"
                                placeholder="Nhập mật khẩu"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item className="login-submit-item">
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={registerLoading}
                            >
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>

                    <Flex justify="center" className="login-links">
                        <Typography.Text>
                            Đã có tài khoản?{' '}
                            <Typography.Link
                                onClick={() => navigate(PATHS.LOGIN)}
                            >
                                Đăng nhập
                            </Typography.Link>
                        </Typography.Text>
                    </Flex>
                </Flex>
            </section>
        </main>
    )
}

export default RegisterPage
