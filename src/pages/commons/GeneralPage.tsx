import { useEffect, useState } from 'react'

import { Button, Empty, Tag, Typography } from 'antd'

import {
    ArrowRightOutlined,
    FireOutlined,
    HistoryOutlined,
    TrophyOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import LoadingState from '@/components/commons/LoadingState'
import type { Exam } from '@/interfaces/quiz/quiz.interface'
import { PATHS } from '@/routers/path'
import { quizService } from '@/services/quiz'

const GeneralPage = () => {
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.auth.user)
    const [exams, setExams] = useState<Exam[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        quizService
            .exams({ page: 1, limit: 3 })
            .then((response) => setExams(response.data))
            .catch(() => undefined)
            .finally(() => setLoading(false))
    }, [])
    return (
        <div className="dashboard-page">
            <section className="dashboard-hero">
                <div>
                    <Typography.Text className="eyebrow">
                        MỖI NGÀY MỘT ÍT · TIẾN BỘ MỘT NHIỀU
                    </Typography.Text>
                    <Typography.Title>
                        Chào {user?.fullName || user?.username || 'bạn'}!
                    </Typography.Title>
                    <Typography.Paragraph>
                        Chọn một bài thi để bắt đầu luyện tập và biến những công
                        thức khó thành điểm số của bạn.
                    </Typography.Paragraph>
                    <Button
                        type="primary"
                        size="large"
                        icon={<ArrowRightOutlined />}
                        iconPosition="end"
                        onClick={() => navigate(PATHS.EXAMS)}
                    >
                        Khám phá kho đề
                    </Button>
                </div>
                <div className="dashboard-hero__shape">
                    <FireOutlined />
                </div>
            </section>
            <div className="dashboard-shortcuts">
                <button type="button" onClick={() => navigate(PATHS.EXAMS)}>
                    <span className="shortcut-icon shortcut-icon--blue">
                        <FireOutlined />
                    </span>
                    <span>
                        <strong>Luyện đề ngay</strong>
                        <small>Chọn đề theo lớp và chủ đề</small>
                    </span>
                    <ArrowRightOutlined />
                </button>
                <button type="button" onClick={() => navigate(PATHS.HISTORY)}>
                    <span className="shortcut-icon shortcut-icon--gold">
                        <HistoryOutlined />
                    </span>
                    <span>
                        <strong>Lịch sử của bạn</strong>
                        <small>Xem lại kết quả đã làm</small>
                    </span>
                    <ArrowRightOutlined />
                </button>
                <button
                    type="button"
                    onClick={() => navigate(PATHS.LEADERBOARD)}
                >
                    <span className="shortcut-icon shortcut-icon--coral">
                        <TrophyOutlined />
                    </span>
                    <span>
                        <strong>Bảng xếp hạng</strong>
                        <small>So sánh điểm với cộng đồng</small>
                    </span>
                    <ArrowRightOutlined />
                </button>
            </div>
            <section className="dashboard-section">
                <div className="section-heading">
                    <div>
                        <Typography.Title level={3}>
                            Bài thi mới nhất
                        </Typography.Title>
                        <Typography.Text type="secondary">
                            Những bài thi đang được mở cho bạn.
                        </Typography.Text>
                    </div>
                    <Button type="link" onClick={() => navigate(PATHS.EXAMS)}>
                        Xem tất cả <ArrowRightOutlined />
                    </Button>
                </div>
                {loading ? (
                    <LoadingState
                        label="Đang tải bài thi mới..."
                        minHeight={160}
                    />
                ) : exams.length ? (
                    <div className="dashboard-exam-grid">
                        {exams.map((exam) => (
                            <button
                                className="dashboard-exam-card"
                                type="button"
                                key={exam.id}
                                onClick={() =>
                                    navigate(PATHS.EXAM_DETAIL(exam.slug))
                                }
                            >
                                <span className="dashboard-exam-card__icon">
                                    ∑
                                </span>
                                <span>
                                    <strong>{exam.title}</strong>
                                    <small>
                                        {exam.variantCount || 0} mã đề · Lớp{' '}
                                        {exam.grades?.join(', ') || '1–12'}
                                    </small>
                                </span>
                                <ArrowRightOutlined />
                            </button>
                        ))}
                    </div>
                ) : (
                    <Empty description="Chưa có bài thi mới" />
                )}
            </section>
        </div>
    )
}

export default GeneralPage
