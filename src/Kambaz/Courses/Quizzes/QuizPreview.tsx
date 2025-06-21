import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchQuizDetails, fetchQuestions, clearCurrent } from './quizzesSlice';
import type { Quiz, Question } from './quizzesService';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    Box,
} from '@mui/material';

export default function QuizPreview() {
    const { cid, quizId } = useParams<{ cid: string; quizId: string }>();
    console.log('cid', cid, 'quizId', quizId);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const quiz = useAppSelector((s) => s.quizzes.currentQuiz) as Quiz | undefined;
    const questions = useAppSelector((s) => s.quizzes.questions) as Question[];

    const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (cid && quizId) {
            dispatch(fetchQuizDetails({ courseId: cid, quizId }));
            dispatch(fetchQuestions({ courseId: cid, quizId }));
        }
        return () => { dispatch(clearCurrent()); };
    }, [cid, quizId, dispatch]);


    if (!quiz) return <Typography>Loading...</Typography>;
    if (!quiz.published) {
        return <Typography color="warning.main">Quiz not published</Typography>;
    }
    if (questions.length === 0) {
        return <Typography>Loading questions...</Typography>;
    }

    const handleChange = (qId: string, value: string | number | boolean) => {
        setAnswers((prev) => ({ ...prev, [qId]: value }));
    };

    const grade = () => {
        let total = 0;
        questions.forEach((q) => {
            const user = answers[q._id];
            let correct = false;
            if (q.type === 'multiple_choice') {
                correct = user === q.choices?.findIndex((c) => c.isCorrect);
            } else if (q.type === 'true_false') {
                correct = user === q.correctBoolean;
            } else if (q.type === 'fill_blank') {
                correct = (q.blanks || []).some(
                    (b) => b.trim().toLowerCase() === String(user).trim().toLowerCase()
                );
            }
            if (correct) total += q.points;
        });
        setScore(total);
        setSubmitted(true);
    };
    return (
        <Card>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    Preview: {quiz.title}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {questions.map((q, idx) => {
                        const userAns = answers[q._id];
                        let correct = false;
                        if (submitted) {
                            if (q.type === 'multiple_choice') {
                                correct = userAns === q.choices?.findIndex((c) => c.isCorrect);
                            } else if (q.type === 'true_false') {
                                correct = userAns === q.correctBoolean;
                            } else if (q.type === 'fill_blank') {
                                correct = (q.blanks || []).some(
                                    (b) => b.trim().toLowerCase() === String(userAns).trim().toLowerCase()
                                );
                            }
                        }

                        return (
                            <Box
                                key={q._id}
                                sx={{
                                    border: submitted
                                        ? correct
                                            ? '2px solid green'
                                            : '2px solid red'
                                        : undefined,
                                    p: 2,
                                    borderRadius: 1,
                                }}
                            >
                                <Typography>
                                    {idx + 1}. {q.question}
                                </Typography>

                                {q.type === 'multiple_choice' && (
                                    <RadioGroup
                                        value={userAns ?? ''}
                                        onChange={(e) => handleChange(q._id, Number(e.target.value))}
                                    >
                                        {q.choices?.map((c, cIdx) => (
                                            <FormControlLabel
                                                key={cIdx}
                                                value={cIdx}
                                                control={<Radio disabled={submitted} />}
                                                label={c.text}
                                            />
                                        ))}
                                    </RadioGroup>
                                )}

                                {q.type === 'true_false' && (
                                    <RadioGroup
                                        value={userAns ?? ''}
                                        onChange={(e) => handleChange(q._id, e.target.value === 'true')}
                                    >
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio disabled={submitted} />}
                                            label="True"
                                        />
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio disabled={submitted} />}
                                            label="False"
                                        />
                                    </RadioGroup>
                                )}

                                {q.type === 'fill_blank' && (
                                    <TextField
                                        fullWidth
                                        disabled={submitted}
                                        value={userAns ?? ''}
                                        onChange={(e) => handleChange(q._id, e.target.value)}
                                    />
                                )}

                                {submitted && (
                                    <Typography
                                        variant="subtitle2"
                                        color={correct ? 'green' : 'red'}
                                        sx={{ mt: 1 }}
                                    >
                                        {correct ? 'Correct' : 'Incorrect'} ({q.points} pts)
                                    </Typography>
                                )}
                            </Box>
                        );
                    })}
                </Box>

                <Box sx={{ mt: 2 }}>
                    {!submitted ? (
                        <>
                            <Button variant="contained" onClick={grade} sx={{ mr: 1 }}>
                                Submit Preview
                            </Button>
                            <Button variant="outlined" onClick={() => navigate(-1)}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Your Score: {score}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate(-1)}
                                sx={{ mr: 1 }}
                            >
                                Back to List
                            </Button>
                        </>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}