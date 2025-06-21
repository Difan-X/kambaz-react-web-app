import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchQuizDetails, fetchQuestions } from './quizzesSlice';
import { Button, Box, Typography, Divider } from "@mui/material";

export default function QuizDetailsScreen() {
    const { courseId, quizId } = useParams();
    const dispatch = useAppDispatch();
    const quiz = useAppSelector(s => s.quizzes.currentQuiz);
    const questions = useAppSelector(s => s.quizzes.questions);
    const loading = useAppSelector(s => s.quizzes.loading);

    const navigate = useNavigate();

    useEffect(() => {
        if (courseId && quizId) {
            dispatch(fetchQuizDetails({ courseId, quizId }));
            dispatch(fetchQuestions({ courseId, quizId }));
        }
    }, [courseId, quizId, dispatch]);

    if (loading || !quiz) return <Typography>Loading...</Typography>;

    // 计算总分与题数
    const pointsTotal = questions.reduce((sum, q) => sum + (q.points ?? 0), 0);
    const questionsCount = questions.length;

    // 时间字符串格式化
    const fmt = (date?: string) =>
        date ? new Date(date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : "-";

    // Availability
    const now = new Date();
    let availability = "";
    if (quiz.availableDate && now < new Date(quiz.availableDate)) {
        availability = `Not available until ${fmt(quiz.availableDate)}`;
    } else if (quiz.untilDate && now > new Date(quiz.untilDate)) {
        availability = "Closed";
    } else {
        availability = "Available";
    }

    return (
        <Box p={3} maxWidth={650} mx="auto" border={1} borderColor="#e0e0e0" borderRadius={2} boxShadow={1} bgcolor="#fafbfc">
            {/* 顶部按钮 */}
            <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
                <Button variant="outlined" onClick={() => {}}>Preview</Button>
                <Button variant="contained" onClick={() => navigate("edit")}>Edit</Button>
            </Box>
            {/* 标题 */}
            <Typography variant="h4" fontWeight="bold" mb={2}>
                {quiz.title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" flexDirection="column" gap={1} mb={2}>
                <Box display="flex" gap={1}>
                    <Box flex={1}><b>Quiz Type</b></Box>
                    <Box flex={2}>{{
                        "graded_quiz": "Graded Quiz",
                        "practice_quiz": "Practice Quiz",
                        "graded_survey": "Graded Survey",
                        "ungraded_survey": "Ungraded Survey"
                    }[quiz.quizType]}</Box>
                </Box>
                <Box display="flex" gap={1}>
                    <Box flex={1}><b>Points</b></Box>
                    <Box flex={2}>{pointsTotal}</Box>
                </Box>
                <Box display="flex" gap={1}>
                    <Box flex={1}><b>Assignment Group</b></Box>
                    <Box flex={2}>{quiz.assignmentGroup?.toUpperCase()}</Box>
                </Box>
                <Box display="flex" gap={1}>
                    <Box flex={1}><b>Shuffle Answers</b></Box>
                    <Box flex={2}>{quiz.shuffleAnswers ? "Yes" : "No"}</Box>
                </Box>
                <Box display="flex" gap={1}>
                    <Box flex={1}><b>Time Limit</b></Box>
                    <Box flex={2}>{quiz.timeLimit} Minutes</Box>
                </Box>
                <Box display="flex" gap={1}>
                    <Box flex={1}><b>Multiple Attempts</b></Box>
                    <Box flex={2}>{quiz.multipleAttempts ? "Yes" : "No"}</Box>
                </Box>
                <Box display="flex" gap={1}>
                    <Box flex={1}><b>How Many Attempts</b></Box>
                    <Box flex={2}>{quiz.howManyAttempts ?? 1}</Box>
                </Box>
                <Box display="flex" gap={1}>
                    <Box flex={1}><b>Show Correct Answers</b></Box>
                    <Box flex={2}>{{
                        "immediately": "Immediately",
                        "never": "Never",
                        "after_last_attempt": "After Last Attempt"
                    }[quiz.showCorrectAnswers]}</Box>
                </Box>
                <Box display="flex" gap={1}>
                    <Box flex={1}><b>Access Code</b></Box>
                    <Box flex={2}>{quiz.accessCode || "None"}</Box>
                </Box>
                <Box display="flex" gap={1}>
                    <Box flex={1}><b>One Question at a Time</b></Box>
                    <Box flex={2}>{quiz.oneQuestionAtATime ? "Yes" : "No"}</Box>
                </Box>
                <Box display="flex" gap={1}>
                    <Box flex={1}><b>Webcam Required</b></Box>
                    <Box flex={2}>{quiz.webcamRequired ? "Yes" : "No"}</Box>
                </Box>
                <Box display="flex" gap={1}>
                    <Box flex={1}><b>Lock Questions After Answering</b></Box>
                    <Box flex={2}>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</Box>
                </Box>
                <Box display="flex" gap={1} mb={2}>
                    <Box flex={1}><b>Availability</b></Box>
                    <Box flex={2}>{availability}</Box>
                </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" gap={1} mb={2}>
                <Box flex={1}><b>Due</b></Box>
                <Box flex={2}>{fmt(quiz.dueDate)}</Box>
            </Box>
            <Box display="flex" gap={1} mb={2}>
                <Box flex={1}><b>Available from</b></Box>
                <Box flex={2}>{fmt(quiz.availableDate)}</Box>
            </Box>
            <Box display="flex" gap={1} mb={2}>
                <Box flex={1}><b>Until</b></Box>
                <Box flex={2}>{fmt(quiz.untilDate)}</Box>
            </Box>
            <Box display="flex" gap={1} mb={2}>
                <Box flex={1}><b>Questions</b></Box>
                <Box flex={2}>{questionsCount}</Box>
            </Box>
        </Box>
    );
}