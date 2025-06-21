import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchLatestAttempt, fetchQuestions, clearCurrent } from './quizzesSlice';
import { Card, CardContent, Typography, Button, Box, Stack } from '@mui/material';

export function QuizResults() {
    const { cid, quizId } = useParams<{ cid: string; quizId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const latestAttempt = useAppSelector((s) => s.quizzes.latestAttempt);
    const questions = useAppSelector((s) => s.quizzes.questions);

    useEffect(() => {
        if (cid && quizId) {
            dispatch(fetchLatestAttempt({ courseId: cid, quizId }));
            dispatch(fetchQuestions({ courseId: cid, quizId }));
        }
        return () => {
            dispatch(clearCurrent());
        };
    }, [cid, quizId, dispatch]);

    if (!latestAttempt) {
        return <Typography>No attempt found.</Typography>;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h4">Quiz Results</Typography>
                <Typography variant="h6">Score: {latestAttempt.score}</Typography>

                <Stack spacing={2} sx={{ mt: 2 }}>
                    {latestAttempt.answers.map((ans, idx) => {
                        const q = questions.find((q) => q._id === ans.questionId);
                        const correct = ans.correct;
                        let correctAnswerText = "";
                        if (q) {
                            if (q.type === "multiple_choice") {
                                const correctIdx = q.choices?.findIndex(c => c.isCorrect);
                                if (typeof correctIdx === 'number' && correctIdx >= 0) {
                                    correctAnswerText = q.choices?.[correctIdx]?.text ?? "";
                                }
                            } else if (q.type === "true_false") {
                                correctAnswerText = String(q.correctBoolean);
                            } else if (q.type === "fill_blank") {
                                correctAnswerText = q.blanks?.join(", ") ?? "";
                            }
                        }
                        return (
                            <Box
                                key={ans.questionId}
                                sx={{
                                    border: correct ? '2px solid green' : '2px solid red',
                                    padding: 2,
                                    borderRadius: 2,
                                }}
                            >
                                <Typography>
                                    {idx + 1}. {q?.question}
                                </Typography>
                                <Typography>
                                    Your answer: {String(ans.answer)}
                                </Typography>
                                <Typography>
                                    Correct answer: {correctAnswerText}
                                </Typography>
                                <Typography color={correct ? 'green' : 'red'}>
                                    {correct ? 'Correct' : 'Incorrect'}
                                </Typography>
                                <Typography>Points: {ans.pointsAwarded}</Typography>
                            </Box>
                        );
                    })}
                </Stack>

                <Button
                    sx={{ mt: 2 }}
                    variant="outlined"
                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes?refresh=${Date.now()}`)}
                >
                    Back to Quizzes
                </Button>
            </CardContent>
        </Card>
    );
}
