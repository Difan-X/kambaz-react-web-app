import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
    fetchQuestions,
    saveQuestions,
    clearCurrent,
} from './quizzesSlice';
import {
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
    Card,
    CardContent,
    IconButton,
    Radio,
    Checkbox,
    FormControlLabel,
    Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Choice {
    text: string;
    isCorrect: boolean;
}

interface Question {
    _id: string;
    quizId: string;
    type: 'multiple_choice' | 'true_false' | 'fill_blank';
    title: string;
    points: number;
    question: string;
    choices?: Choice[];
    correctBoolean?: boolean;
    blanks?: string[];
}

export default function QuizQuestionsEditor() {
    const { cid, quizId } = useParams<{ cid: string; quizId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const questions = useAppSelector((s) => s.quizzes.questions) as Question[];
    const loading = useAppSelector((s) => s.quizzes.loading);
    const error = useAppSelector((s) => s.quizzes.error);

    const [localQuestions, setLocalQuestions] = useState<Question[]>([]);

    useEffect(() => {
        if (cid && quizId) {
            dispatch(fetchQuestions({ courseId: cid, quizId }));
        }
        return () => {
            dispatch(clearCurrent());
        };
    }, [cid, quizId, dispatch]);

    useEffect(() => {
        setLocalQuestions(questions);
    }, [questions]);

    const handleAdd = () => {
        setLocalQuestions((prev) => [
            ...prev,
            {
                _id: '',
                quizId: quizId!,
                type: 'multiple_choice',
                title: '',
                points: 1,
                question: '',
                choices: [{ text: '', isCorrect: false }],
            },
        ]);
    };

    const handleChange = (
        idx: number,
        field: keyof Question,
        value: string | number | boolean
    ) => {
        setLocalQuestions((prev) =>
            prev.map((q, i) => {
                if (i !== idx) return q;
                const updated = { ...q, [field]: value };
                if (field === 'type') {
                    if (value === 'multiple_choice') {
                        return { ...updated, choices: [{ text: '', isCorrect: false }], correctBoolean: undefined, blanks: undefined };
                    }
                    if (value === 'true_false') {
                        return { ...updated, correctBoolean: false, choices: undefined, blanks: undefined };
                    }
                    if (value === 'fill_blank') {
                        return { ...updated, blanks: [''], choices: undefined, correctBoolean: undefined };
                    }
                }
                return updated;
            })
        );
    };

    const handleChoiceChange = (qIdx: number, cIdx: number, text: string) => {
        setLocalQuestions((prev) =>
            prev.map((q, i) =>
                i === qIdx && q.choices
                    ? {
                        ...q,
                        choices: q.choices.map((c, j) => (j === cIdx ? { ...c, text } : c)),
                    }
                    : q
            )
        );
    };

    const handleCorrectChoice = (qIdx: number, cIdx: number) => {
        setLocalQuestions((prev) =>
            prev.map((q, i) =>
                i === qIdx && q.choices
                    ? {
                        ...q,
                        choices: q.choices.map((c, j) => ({ ...c, isCorrect: j === cIdx })),
                    }
                    : q
            )
        );
    };

    const handleAddChoice = (qIdx: number) => {
        setLocalQuestions((prev) =>
            prev.map((q, i) =>
                i === qIdx
                    ? { ...q, choices: [...(q.choices || []), { text: '', isCorrect: false }] }
                    : q
            )
        );
    };

    const handleBlankChange = (qIdx: number, bIdx: number, text: string) => {
        setLocalQuestions((prev) =>
            prev.map((q, i) =>
                i === qIdx && q.blanks
                    ? { ...q, blanks: q.blanks.map((b, j) => (j === bIdx ? text : b)) }
                    : q
            )
        );
    };

    const handleAddBlank = (qIdx: number) => {
        setLocalQuestions((prev) =>
            prev.map((q, i) =>
                i === qIdx ? { ...q, blanks: [...(q.blanks || []), ''] } : q
            )
        );
    };

    const handleDelete = (idx: number) => {
        setLocalQuestions((prev) => prev.filter((_, i) => i !== idx));
    };

    const onSave = async () => {
        if (!cid || !quizId) return;
        try {
            await dispatch(saveQuestions({ courseId: cid, quizId, questions: localQuestions })).unwrap();
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`);
        } catch (e) {
            console.error('Failed to save questions:', e);
        }
    };

    const onCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`);
    };

    if (loading) return <Typography>Loading questions...</Typography>;
    if (error) return <Typography color="error">{String(error)}</Typography>;

    return (
        <Box>
            <Typography variant="h5">Edit Questions</Typography>
            <Button variant="contained" onClick={handleAdd} sx={{ my: 2 }}>
                New Question
            </Button>

            {localQuestions.map((q, idx) => (
                <Card key={idx} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Box display="flex" flexWrap="wrap" gap={2}>
                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    value={q.type}
                                    label="Type"
                                    onChange={(e) => handleChange(idx, 'type', e.target.value as string)}
                                >
                                    <MenuItem value="multiple_choice">Multiple Choice</MenuItem>
                                    <MenuItem value="true_false">True / False</MenuItem>
                                    <MenuItem value="fill_blank">Fill in the Blank</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                sx={{ flex: '1 1 300px' }}
                                label="Title"
                                value={q.title}
                                onChange={(e) => handleChange(idx, 'title', e.target.value)}
                            />
                            <TextField
                                type="number"
                                sx={{ width: 120 }}
                                label="Points"
                                value={q.points}
                                onChange={(e) => handleChange(idx, 'points', Number(e.target.value))}
                            />
                            <TextField
                                fullWidth
                                multiline
                                minRows={2}
                                label="Question"
                                value={q.question}
                                onChange={(e) => handleChange(idx, 'question', e.target.value)}
                            />
                        </Box>

                        {/* Multiple-choice */}
                        {q.type === 'multiple_choice' && q.choices && (
                            <Box sx={{ mt: 2 }}>
                                {q.choices.map((c, cIdx) => (
                                    <Box key={cIdx} display="flex" alignItems="center" gap={1} mb={1}>
                                        <Radio
                                            checked={c.isCorrect}
                                            onChange={() => handleCorrectChoice(idx, cIdx)}
                                        />
                                        <TextField
                                            label={`Choice ${cIdx + 1}`}
                                            value={c.text}
                                            onChange={(e) => handleChoiceChange(idx, cIdx, e.target.value)}
                                            sx={{ flex: 1 }}
                                        />
                                    </Box>
                                ))}
                                <Button onClick={() => handleAddChoice(idx)}>Add Choice</Button>
                            </Box>
                        )}

                        {/* True/False */}
                        {q.type === 'true_false' && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={q.correctBoolean || false}
                                        onChange={(e) => handleChange(idx, 'correctBoolean', e.target.checked)}
                                    />
                                }
                                label="Correct Answer is True"
                                sx={{ mt: 2 }}
                            />
                        )}

                        {/* Fill-blank */}
                        {q.type === 'fill_blank' && q.blanks && (
                            <Box sx={{ mt: 2 }}>
                                {q.blanks.map((b, bIdx) => (
                                    <Box key={bIdx} display="flex" alignItems="center" gap={1} mb={1}>
                                        <TextField
                                            label={`Correct Answer ${bIdx + 1}`}
                                            value={b}
                                            onChange={(e) => handleBlankChange(idx, bIdx, e.target.value)}
                                            sx={{ flex: 1 }}
                                        />
                                    </Box>
                                ))}
                                <Button onClick={() => handleAddBlank(idx)}>Add Blank Answer</Button>
                            </Box>
                        )}

                        {/* Delete */}
                        <Box sx={{ textAlign: 'right', mt: 2 }}>
                            <IconButton color="error" onClick={() => handleDelete(idx)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            ))}

            <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={onSave} sx={{ mr: 1 }}>
                    Save
                </Button>
                <Button variant="outlined" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}
