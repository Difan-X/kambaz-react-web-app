import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../store';
import type { RootState } from '../../store';
import {
    fetchQuizDetails,
    fetchQuestions,
    clearCurrent,
    fetchLatestAttempt,
    submitAttempt,
} from './quizzesSlice';
import { getAttemptsCount } from './quizzesService';
import type { Quiz, Question, AttemptAnswer, AnswerValue } from './quizzesService';
import {
    Card, CardContent, Typography, Button,
    Radio, RadioGroup, FormControlLabel, TextField, Box
} from '@mui/material';

export default function QuizTaking() {
    const { cid, quizId } = useParams<{ cid: string; quizId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const quiz = useAppSelector((state: RootState) => state.quizzes.currentQuiz) as Quiz;
    const questions = useAppSelector((state: RootState) => state.quizzes.questions) as Question[];
    const latestAttempt = useAppSelector((state: RootState) => state.quizzes.latestAttempt) as { answers: AttemptAnswer[] } | null;
    const loading = useAppSelector((state: RootState) => state.quizzes.loading);
    const error = useAppSelector((state: RootState) => state.quizzes.error);

    const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
    const [attemptsCount, setAttemptsCount] = useState<number | null>(null);

    // 新增倒计时、题目切换、时间
    const [now, setNow] = useState(new Date());
    const [timeLeft, setTimeLeft] = useState<number>(quiz?.timeLimit ? quiz.timeLimit * 60 : 600);
    const [currentIdx, setCurrentIdx] = useState(0);

    const timerRef = useRef<number | null>(null);

    // 页面加载
    useEffect(() => {
        if (cid && quizId) {
            dispatch(fetchQuizDetails({ courseId: cid, quizId })).then(unwrapResult);
            dispatch(fetchQuestions({ courseId: cid, quizId })).then(unwrapResult);
            dispatch(fetchLatestAttempt({ courseId: cid, quizId })).then(unwrapResult);
            getAttemptsCount(cid, quizId).then(res => setAttemptsCount(res.data.count));
        }
        return () => {
            dispatch(clearCurrent());
            if (timerRef.current) window.clearInterval(timerRef.current);
        };
    }, [cid, quizId, dispatch]);

    // quiz 切换或首次加载，重设时间与题号
    useEffect(() => {
        setNow(new Date());
        setTimeLeft(quiz?.timeLimit ? quiz.timeLimit * 60 : 600);
        setCurrentIdx(0);
    }, [quiz]);

    useEffect(() => {
        timerRef.current = window.setInterval(() => {
            setNow(new Date());
            setTimeLeft((t) => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
    }, []);

    // 倒计时到0自动提交
    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit(true);
        }
        // eslint-disable-next-line
    }, [timeLeft]);

    useEffect(() => {
        if (latestAttempt) {
            const initial: Record<string, AnswerValue> = {};
            latestAttempt.answers.forEach((a) => { initial[a.questionId] = a.answer; });
            setAnswers(initial);
        }
    }, [latestAttempt]);

    if (loading || !quiz) return <Typography>Loading quiz...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    const howMany = quiz.howManyAttempts ?? 1;
    const used = attemptsCount ?? 0;
    const remaining = attemptsCount === null ? "..." : (howMany - used);

    const currentQuestion = questions[currentIdx];

    const handleChange = (qId: string, value: AnswerValue) => {
        setAnswers((prev) => ({ ...prev, [qId]: value }));
    };

    function formatTime(sec: number) {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${String(s).padStart(2, '0')}`;
    }

    const handleSubmit = (auto = false) => {
        if (attemptsCount !== null && attemptsCount >= howMany) {
            alert("You have used all your attempts and can no longer take this quiz.\n");
            navigate(`/Kambaz/Courses/${cid}/Quizzes`);
            return;
        }
        if (!auto) {
            if (!window.confirm(
                `Attempts allowed: ${howMany}, Attempted: ${used}, Remaining: ${remaining}\nAre you sure you want to submit?`
            )) return;
        }

        let totalScore = 0;
        const answerArray: AttemptAnswer[] = questions.map((q) => {
            const userAns = answers[q._id];
            let correct = false;
            if (q.type === 'multiple_choice') {
                const correctIndex = q.choices?.findIndex((c) => c.isCorrect);
                correct = userAns === correctIndex;
            } else if (q.type === 'true_false') {
                correct = userAns === q.correctBoolean;
            } else if (q.type === 'fill_blank') {
                correct = (q.blanks || []).some(
                    (b) => b.trim().toLowerCase() === String(userAns).trim().toLowerCase()
                );
            }
            if (correct) totalScore += q.points;
            return {
                questionId: q._id,
                answer: userAns,
                correct,
                pointsAwarded: correct ? q.points : 0,
            };
        });

        dispatch(
            submitAttempt({ courseId: cid!, quizId: quizId!, answers: answerArray, score: totalScore })
        )
            .then(unwrapResult)
            .then(() => {
                // ---- 提交成功后直接跳到 results/review 页 ----
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/results`);
            })
            .catch((err) => {
                console.error('Submit failed', err);
            });
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    {quiz.title}
                </Typography>
                <Typography>
                    Current Time: {now.toLocaleTimeString()}
                </Typography>
                <Typography color={timeLeft <= 10 ? "error" : undefined}>
                    Time Left: {formatTime(timeLeft)}
                </Typography>
                <Typography variant="body2" color="info.main" gutterBottom>
                    Attempts allowed: {howMany}, Attempted: {used}, Remaining: {remaining}
                </Typography>
                <Typography variant="body2" sx={{mb: 2}}>
                    Question {currentIdx + 1} of {questions.length}
                </Typography>

                {/* 只显示当前题 */}
                {currentQuestion && (
                    <Box
                        key={currentQuestion._id}
                        sx={{
                            mb: 2,
                            p: 2,
                            border: '1px solid #ccc',
                            borderRadius: 1,
                        }}
                    >
                        <Typography>
                            {currentIdx + 1}. {currentQuestion.question}
                        </Typography>
                        {currentQuestion.type === 'multiple_choice' && (
                            <RadioGroup
                                value={answers[currentQuestion._id] ?? ''}
                                onChange={(e) => handleChange(currentQuestion._id, Number(e.target.value))}
                            >
                                {currentQuestion.choices?.map((c, cIdx) => (
                                    <FormControlLabel
                                        key={cIdx}
                                        value={cIdx}
                                        control={<Radio />}
                                        label={c.text}
                                    />
                                ))}
                            </RadioGroup>
                        )}
                        {currentQuestion.type === 'true_false' && (
                            <RadioGroup
                                value={answers[currentQuestion._id] ?? ''}
                                onChange={(e) => handleChange(currentQuestion._id, e.target.value === 'true')}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="True" />
                                <FormControlLabel value="false" control={<Radio />} label="False" />
                            </RadioGroup>
                        )}
                        {currentQuestion.type === 'fill_blank' && (
                            <TextField
                                fullWidth
                                value={answers[currentQuestion._id] ?? ''}
                                onChange={(e) => handleChange(currentQuestion._id, e.target.value)}
                            />
                        )}
                    </Box>
                )}

                {/* 切换题目按钮 */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Button
                        variant="outlined"
                        disabled={currentIdx === 0}
                        onClick={() => setCurrentIdx(i => i - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outlined"
                        disabled={currentIdx === questions.length - 1}
                        onClick={() => setCurrentIdx(i => i + 1)}
                    >
                        Next
                    </Button>
                </Box>

                <div style={{ marginTop: 24 }}>
                    <Button variant="contained" onClick={() => handleSubmit(false)}>
                        Submit Quiz
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}