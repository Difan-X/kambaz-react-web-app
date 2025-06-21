import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import type { RootState } from '../../store';
import {
    fetchQuizDetails,
    updateQuiz,
    togglePublish,
    clearCurrent,
} from './quizzesSlice';
import type { Quiz } from './quizzesService';
import {
    TextField,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    Button,
    Typography,
    Box,
} from '@mui/material';

type FormState = {
    title: string;
    description: string;
    quizType: Quiz['quizType'];
    assignmentGroup: Quiz['assignmentGroup'];
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    howManyAttempts: number;
    showCorrectAnswers: Quiz['showCorrectAnswers'];
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate?: string;
    availableDate?: string;
    untilDate?: string;
};

export default function QuizDetailsEditor() {
    const { cid, quizId } = useParams<{ cid: string; quizId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const quiz = useAppSelector((s: RootState) => s.quizzes.currentQuiz) as Quiz | null;
    const error = useAppSelector((s: RootState) => s.quizzes.error);

    // 当前用户角色
    const role = useAppSelector((s: RootState) => s.account.currentUser?.role);

    const [isSaving, setIsSaving] = useState(false);

    const [form, setForm] = useState<FormState>({
        title: '',
        description: '',
        quizType: 'graded_quiz',
        assignmentGroup: 'quizzes',
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        howManyAttempts: 1,
        showCorrectAnswers: 'after_last_attempt',
        accessCode: '',
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: undefined,
        availableDate: undefined,
        untilDate: undefined,
    });

    useEffect(() => {
        if (cid && quizId) {
            dispatch(fetchQuizDetails({ courseId: cid, quizId }));
        }
        return () => {
            dispatch(clearCurrent());
        };
    }, [cid, quizId, dispatch]);

    useEffect(() => {
        if (quiz) {
            setForm({
                title: quiz.title,
                description: quiz.description ?? '',
                quizType: quiz.quizType,
                assignmentGroup: quiz.assignmentGroup,
                shuffleAnswers: quiz.shuffleAnswers,
                timeLimit: quiz.timeLimit,
                multipleAttempts: quiz.multipleAttempts,
                howManyAttempts: quiz.howManyAttempts ?? 1,
                showCorrectAnswers: quiz.showCorrectAnswers,
                accessCode: quiz.accessCode ?? '',
                oneQuestionAtATime: quiz.oneQuestionAtATime,
                webcamRequired: quiz.webcamRequired,
                lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
                dueDate: quiz.dueDate?.slice(0, 16),
                availableDate: quiz.availableDate?.slice(0, 16),
                untilDate: quiz.untilDate?.slice(0, 16),
            });
        }
    }, [quiz]);

    const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((f) => ({ ...f, [key]: value }));
    };

    const onSave = async () => {
        if (!cid || !quizId) return;
        setIsSaving(true);
        try {
            await dispatch(
                updateQuiz({
                    courseId: cid,
                    quizId,
                    data: {
                        ...form,
                        dueDate: form.dueDate,
                        availableDate: form.availableDate,
                        untilDate: form.untilDate,
                    },
                })
            ).unwrap();
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`);
        } catch  {
            // 可以加 toast 错误处理
        } finally {
            setIsSaving(false);
        }
    };

    const onSavePublish = async () => {
        setIsSaving(true);
        try {
            await onSave();
            if (!cid || !quizId) return;
            await dispatch(togglePublish({ courseId: cid, quizId, publish: true })).unwrap();
            navigate(`/Kambaz/Courses/${cid}/Quizzes`);
        } catch {
            // 错误处理
        } finally {
            setIsSaving(false);
        }
    };

    const onCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    // 只在 quiz 数据没加载出来时 loading
    if (!quiz) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box p={2}>
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Title"
                    value={form.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                />
            </Box>
            <Box mb={2}>
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Description"
                    value={form.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                />
            </Box>
            <Box display="flex" gap={2} mb={2}>
                <Box flex={1}>
                    <Typography>Quiz Type</Typography>
                    <Select
                        fullWidth
                        value={form.quizType}
                        onChange={(e) => handleChange('quizType', e.target.value as never)}
                    >
                        <MenuItem value="graded_quiz">Graded Quiz</MenuItem>
                        <MenuItem value="practice_quiz">Practice Quiz</MenuItem>
                        <MenuItem value="graded_survey">Graded Survey</MenuItem>
                        <MenuItem value="ungraded_survey">Ungraded Survey</MenuItem>
                    </Select>
                </Box>
                <Box flex={1}>
                    <Typography>Assignment Group</Typography>
                    <Select
                        fullWidth
                        value={form.assignmentGroup}
                        onChange={(e) => handleChange('assignmentGroup', e.target.value as never)}
                    >
                        <MenuItem value="quizzes">Quizzes</MenuItem>
                        <MenuItem value="exams">Exams</MenuItem>
                        <MenuItem value="assignments">Assignments</MenuItem>
                        <MenuItem value="project">Project</MenuItem>
                    </Select>
                </Box>
            </Box>
            <Box display="flex" gap={2} mb={2}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={form.shuffleAnswers}
                            onChange={(e) => handleChange('shuffleAnswers', e.target.checked)}
                        />
                    }
                    label="Shuffle Answers"
                />
                <TextField
                    type="number"
                    label="Time Limit (min)"
                    value={form.timeLimit}
                    onChange={(e) => handleChange('timeLimit', Number(e.target.value))}
                    sx={{ flex: 1 }}
                />
                <Box flex={1}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.multipleAttempts}
                                onChange={(e) => handleChange('multipleAttempts', e.target.checked)}
                            />
                        }
                        label="Multiple Attempts"
                    />
                    {form.multipleAttempts && (
                        <TextField
                            type="number"
                            label="How Many Attempts"
                            value={form.howManyAttempts}
                            onChange={(e) =>
                                handleChange('howManyAttempts', Number(e.target.value))
                            }
                            sx={{ mt: 1 }}
                        />
                    )}
                </Box>
            </Box>
            <Box display="flex" gap={2} mb={2}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={form.oneQuestionAtATime}
                            onChange={(e) =>
                                handleChange('oneQuestionAtATime', e.target.checked)
                            }
                        />
                    }
                    label="One Question at a Time"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={form.webcamRequired}
                            onChange={(e) => handleChange('webcamRequired', e.target.checked)}
                        />
                    }
                    label="Webcam Required"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={form.lockQuestionsAfterAnswering}
                            onChange={(e) =>
                                handleChange('lockQuestionsAfterAnswering', e.target.checked)
                            }
                        />
                    }
                    label="Lock After Answering"
                />
            </Box>
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Access Code"
                    value={form.accessCode}
                    onChange={(e) => handleChange('accessCode', e.target.value)}
                />
            </Box>
            <Box display="flex" gap={2} mb={2}>
                <TextField
                    fullWidth
                    type="datetime-local"
                    label="Available Date"
                    value={form.availableDate ?? ''}
                    onChange={(e) => handleChange('availableDate', e.target.value || undefined)}
                />
                <TextField
                    fullWidth
                    type="datetime-local"
                    label="Until Date"
                    value={form.untilDate ?? ''}
                    onChange={(e) => handleChange('untilDate', e.target.value || undefined)}
                />
                <TextField
                    fullWidth
                    type="datetime-local"
                    label="Due Date"
                    value={form.dueDate ?? ''}
                    onChange={(e) => handleChange('dueDate', e.target.value || undefined)}
                />
            </Box>
            <Box mt={2}>
                <Button variant="contained" onClick={onSave} sx={{ mr: 1 }} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save'}
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={onSavePublish}
                    sx={{ mr: 1 }}
                    disabled={isSaving}
                >
                    {isSaving ? 'Publishing...' : 'Save & Publish'}
                </Button>
                <Button variant="outlined" onClick={onCancel} disabled={isSaving}>
                    Cancel
                </Button>
                {/* 教师/管理员可以编辑题目 */}
                {role === 'FACULTY' || role === 'ADMIN' ? (
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/questions`)}
                        sx={{ ml: 1 }}
                    >
                        Edit Questions
                    </Button>
                ) : null}
            </Box>
        </Box>
    );
}