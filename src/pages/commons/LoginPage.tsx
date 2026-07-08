import { FC, useState } from 'react'

import {
    Button,
    Divider,
    Flex,
    Form,
    Input,
    Typography,
    notification,
} from 'antd'

import { GoogleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import '@/pages/styles/login.css'
import { PATHS } from '@/routers/path'
import { loginAction } from '@/stores/auth/authAction'

const { Title } = Typography

const RequiredLabel: FC<{ children: string }> = ({ children }) => (
    <span>
        {children} <span className="login-required-mark">*</span>
    </span>
)

const LoginForm: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [loginLoading, setLoginLoading] = useState(false)

    const onLoginFinish = async (values: any) => {
        setLoginLoading(true)
        try {
            const loginResponse: any = await dispatch(
                loginAction({
                    email: values.email,
                    password: values.password,
                    twoFactorCode: '',
                    twoFactorRecoveryCode: '',
                })
            )
            if (loginResponse.type === '/auth/login/fulfilled') {
                notification.success({
                    message: 'Login successfully!',
                    description: 'Welcome back',
                })
                const from =
                    (location.state as { from?: { pathname: string } })?.from
                        ?.pathname ?? PATHS.GENERAL
                navigate(from, { replace: true })
            } else if (loginResponse.type === '/auth/login/rejected') {
                notification.error({
                    message: 'Login failed!',
                    description: 'Incorrect username or password',
                })
            }
        } catch (e: any) {
            notification.error({
                message: 'Login failed!',
                description: 'Incorrect username or password',
            })
        } finally {
            setLoginLoading(false)
        }
    }

    return (
        <main className="login-page">
            <section className="login-illustration" aria-hidden="true">
                <img src="/login-background.svg" alt="" />
            </section>

            <section className="login-panel">
                <Flex vertical className="login-form-shell">
                    <Title level={2} className="login-title">
                        Đăng nhập
                    </Title>

                    <Form
                        colon={false}
                        layout="vertical"
                        onFinish={onLoginFinish}
                        requiredMark={false}
                        className="login-form"
                    >
                        <Form.Item
                            label={<RequiredLabel>Email</RequiredLabel>}
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
                            <Input size="large" />
                        </Form.Item>

                        <Form.Item
                            label={<RequiredLabel>Mật khẩu</RequiredLabel>}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu',
                                },
                            ]}
                        >
                            <Input.Password size="large" />
                        </Form.Item>

                        <Form.Item className="login-submit-item">
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={loginLoading}
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>

                    <Flex justify="space-between" className="login-links">
                        <Typography.Link href="#">
                            Quên mật khẩu?
                        </Typography.Link>
                        <Typography.Link href="#">
                            Đăng ký tài khoản
                        </Typography.Link>
                    </Flex>

                    <Divider plain className="login-divider">
                        hoặc
                    </Divider>

                    <Button
                        block
                        size="large"
                        className="login-google-button"
                        icon={<GoogleOutlined />}
                    >
                        Đăng nhập với Google
                    </Button>
                </Flex>
            </section>
        </main>
    )
}

export default LoginForm
