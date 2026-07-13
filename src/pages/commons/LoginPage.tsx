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
import { useNavigate } from 'react-router-dom'

import '@/pages/styles/login.css'
import { PATHS } from '@/routers/path'
import { AppDispatch } from '@/stores'
import { getCurrentUserAction, loginAction } from '@/stores/auth/authAction'

const { Title } = Typography

const LoginForm: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [loginLoading, setLoginLoading] = useState(false)

    const onLoginFinish = async (values: any) => {
        setLoginLoading(true)
        try {
            await dispatch(
                loginAction({
                    email: values.email,
                    password: values.password,
                })
            ).unwrap()

            const currentUser = await dispatch(getCurrentUserAction()).unwrap()

            if (currentUser) {
                notification.success({
                    message: 'Đăng nhập thành công!',
                    description: 'Chào mừng trở lại',
                    placement: 'bottomRight',
                })
                navigate(PATHS.GENERAL)
                return
            }

            notification.error({
                message: 'Đăng nhập thất bại!',
                description: 'Không thể lấy thông tin tài khoản',
                placement: 'bottomRight',
            })
            return
        } catch (err) {
            notification.error({
                message: 'Đăng nhập thất bại!',
                description: 'Tài khoản hoặc mật khẩu không đúng',
                placement: 'bottomRight',
            })
        } finally {
            setLoginLoading(false)
        }
    }

    return (
        <main className="login-page">
            <section className="login-illustration" aria-hidden="true">
                <img src="/login-background.svg" alt="Login background" />
            </section>

            <section className="login-panel">
                <Flex vertical className="login-form-shell">
                    <Title level={1} className="login-title">
                        ĐĂNG NHẬP
                    </Title>

                    <Form
                        colon={false}
                        layout="vertical"
                        onFinish={onLoginFinish}
                        requiredMark={false}
                        className="login-form"
                    >
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
                            ]}
                        >
                            <Input.Password
                                placeholder="Nhập password"
                                size="large"
                            />
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
