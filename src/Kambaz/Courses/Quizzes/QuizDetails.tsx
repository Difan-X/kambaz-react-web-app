import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type RootState, useAppDispatch, useAppSelector } from '../../store';
import {
    fetchQuizDetails,
    fetchQuestions,
    clearCurrent,
} from './quizzesSlice.ts';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';

export function QuizDetails() {
    const { cid, quizId } = useParams<{ cid: string; quizId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const quiz = useAppSelector((state: RootState) => state.quizzes.currentQuiz);
    const questions = useAppSelector((state: RootState) => state.quizzes.questions);
    const loading = useAppSelector((state: RootState) => state.quizzes.loading);
    const error = useAppSelector((state: RootState) => state.quizzes.error);
    const role = useAppSelector((state: RootState) => state.account.currentUser?.role);

    useEffect(() => {
        if (cid && quizId) {
            dispatch(fetchQuizDetails({ courseId: cid, quizId }));
            dispatch(fetchQuestions({ courseId: cid, quizId }));
        }
        return () => {
            dispatch(clearCurrent());
        };
    }, [cid, quizId, dispatch]);

    if (loading || !quiz) {
        return <Typography>Loading...</Typography>;
    }
    if (error) {
        return <Typography color="error">{error}</Typography>;
    }


    // compute summary fields
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const numQuestions = questions.length;

    return (
        <Card>
            <CardContent>
                {/* Title */}
                <Typography variant="h4" sx={{ mb: 3 }}>
                    {quiz.title}
                </Typography>

                {/* Properties: 两列展示 */}
                <Box display="flex" gap={4} mb={2}>
                    <Box flex={1}>
                        <Typography><strong>Type:</strong> {quiz.quizType.replace('_', ' ')}</Typography>
                        <Typography><strong>Assignment Group:</strong> {quiz.assignmentGroup}</Typography>
                        <Typography>
                            <strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? 'Yes' : 'No'}
                        </Typography>
                        <Typography>
                            <strong>Time Limit:</strong> {quiz.timeLimit} minutes
                        </Typography>
                        <Typography>
                            <strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? 'Yes' : 'No'}
                        </Typography>
                        {quiz.multipleAttempts && (
                            <Typography>
                                <strong>How Many Attempts:</strong> {quiz.howManyAttempts}
                            </Typography>
                        )}
                        <Typography>
                            <strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers.replace(/_/g, ' ')}
                        </Typography>
                        <Typography>
                            <strong>Access Code:</strong> {quiz.accessCode || 'None'}
                        </Typography>
                    </Box>
                    <Box flex={1}>
                        <Typography>
                            <strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? 'Yes' : 'No'}
                        </Typography>
                        <Typography>
                            <strong>Webcam Required:</strong> {quiz.webcamRequired ? 'Yes' : 'No'}
                        </Typography>
                        <Typography>
                            <strong>Lock After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}
                        </Typography>
                        <Typography>
                            <strong>Available Date:</strong>{' '}
                            {quiz.availableDate ? new Date(quiz.availableDate).toLocaleString() : '—'}
                        </Typography>
                        <Typography>
                            <strong>Until Date:</strong>{' '}
                            {quiz.untilDate ? new Date(quiz.untilDate).toLocaleString() : '—'}
                        </Typography>
                        <Typography>
                            <strong>Due Date:</strong>{' '}
                            {quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : '—'}
                        </Typography>
                        <Typography>
                            <strong>Published:</strong> {quiz.published ? 'Yes' : 'No'}
                        </Typography>
                    </Box>
                </Box>

                {/* Computed fields */}
                <Box display="flex" gap={4} mb={2}>
                    <Box flex={1}>
                        <Typography><strong>Total Points:</strong> {totalPoints}</Typography>
                    </Box>
                    <Box flex={1}>
                        <Typography><strong>Number of Questions:</strong> {numQuestions}</Typography>
                    </Box>
                </Box>

                {/* Action buttons */}
                <Box mt={3}>
                    {role === 'FACULTY' ? (
                        <>
                            <Button
                                variant="contained"
                                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/edit`)}
                                sx={{ mr: 1 }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/preview`)}
                            >
                                Preview
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/take`)}
                        >
                            Start Quiz
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}