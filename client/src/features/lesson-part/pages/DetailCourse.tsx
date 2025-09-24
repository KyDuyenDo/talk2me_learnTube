import type { FunctionComponent } from "react"
import LessonPart from "../components/LessonPart"
import { LeftIcon } from "../../../utils/constant/icon"
import { useNavigate } from "react-router-dom"


interface CourseDetailProps {
    params?: { id: string }
}

const lessonData = [
    {
        title: "Quiz - Test Your Knowledge",
        complete: false,
        minutes: "15",
        task: "5",
        type: "quiz",
        theory: `
### Quiz Theory

Trong phần Quiz, bạn sẽ được kiểm tra kiến thức đã học thông qua các câu hỏi trắc nghiệm và tự luận.

**Mục tiêu:**
- Đánh giá mức độ hiểu bài của học viên
- Củng cố kiến thức đã học
- Xác định những điểm cần cải thiện

**Cấu trúc Quiz:**
- 5 câu hỏi trắc nghiệm (3 điểm mỗi câu)
- 2 câu hỏi tự luận ngắn (2.5 điểm mỗi câu)
- Thời gian làm bài: 15 phút
- Điểm đạt: 7/10

**Lưu ý:**
- Đọc kỹ đề bài trước khi trả lời
- Quản lý thời gian hợp lý
- Kiểm tra lại đáp án trước khi nộp bài
    `,
    },
    {
        title: "Writing - Express Your Ideas",
        complete: false,
        minutes: "25",
        task: "3",
        type: "writing",
        theory: `
### Writing Theory

Phần Writing giúp bạn phát triển kỹ năng viết và diễn đạt ý tưởng một cách rõ ràng, logic.

**Mục tiêu:**
- Rèn luyện kỹ năng viết học thuật
- Phát triển khả năng tổ chức ý tưởng
- Cải thiện ngữ pháp và từ vựng

**Các dạng bài Writing:**
- **Essay Writing**: Viết luận với cấu trúc rõ ràng (mở bài - thân bài - kết luận)
- **Creative Writing**: Viết sáng tạo, kể chuyện
- **Report Writing**: Viết báo cáo, tóm tắt thông tin

**Tiêu chí đánh giá:**
- Nội dung và ý tưởng (40%)
- Cấu trúc và tổ chức (30%)
- Ngữ pháp và từ vựng (30%)

**Tips để viết tốt:**
- Lập dàn ý trước khi viết
- Sử dụng từ nối để liên kết ý
- Kiểm tra chính tả và ngữ pháp
    `,
    },
    {
        title: "Speaking - Practice Your Voice",
        complete: true,
        minutes: "20",
        task: "4",
        type: "speaking",
        theory: `
### Speaking Theory

Phần Speaking giúp bạn rèn luyện kỹ năng nói và giao tiếp hiệu quả.

**Mục tiêu:**
- Phát triển khả năng diễn đạt bằng lời nói
- Cải thiện phát âm và ngữ điệu
- Tăng cường tự tin khi giao tiếp

**Các hoạt động Speaking:**
- **Presentation**: Thuyết trình về một chủ đề (5-7 phút)
- **Discussion**: Thảo luận nhóm về các vấn đề
- **Role-play**: Đóng vai trong các tình huống thực tế
- **Q&A Session**: Trả lời câu hỏi tự phát

**Tiêu chí đánh giá:**
- Độ trưng và logic (25%)
- Phát âm và ngữ điệu (25%)
- Từ vựng và ngữ pháp (25%)
- Tương tác và giao tiếp (25%)

**Lời khuyên:**
- Luyện tập thường xuyên trước gương
- Ghi âm để tự đánh giá
- Tham gia các nhóm thảo luận
- Đừng ngại mắc lỗi, hãy học từ sai lầm
    `,
    },
]

const CourseDetail: FunctionComponent<CourseDetailProps> = ({ params }) => {
    const navigate = useNavigate()
    const handleClickResult = (lessonTitle: string) => {
        alert(`Xem kết quả cho ${lessonTitle}`)
    }

    const handleClickAccess = (lessonTitle: string) => {
        alert(`Truy cập ${lessonTitle}`)
    }

    return (
        <div className="min-h-screen bg-white px-7 py-8">
            <div className="p-3">
                {/* Header */}
                <div className="flex justify-start">
                    <button onClick={() => navigate(-1)} className="flex">
                        <LeftIcon />
                        <span className="text-[length:var(--font-size-sm)] text-[var(--color-primary)]">Back</span>
                    </button>
                </div>

                {/* Course Content */}
                <div className="pt-8">
                    <div className="space-y-6">
                        {lessonData.map((lesson, index) => (
                            <LessonPart
                                key={index}
                                title={lesson.title}
                                complete={lesson.complete}
                                minutes={lesson.minutes}
                                task={lesson.task}
                                theory={lesson.theory}
                                onClickResult={() => handleClickResult(lesson.title)}
                                onClickAccess={() => navigate('/courses/1212/quiz')}
                            />

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail
