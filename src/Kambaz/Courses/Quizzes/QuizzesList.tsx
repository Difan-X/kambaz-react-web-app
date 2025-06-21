import { useEffect, useState, useMemo, useCallback, type MouseEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector, type RootState } from '../../store';
import {
    fetchQuizzes,
    addQuiz,
    removeQuiz,
    togglePublish,
} from './quizzesSlice';
import type { Quiz } from './quizzesService';
import { getLatestAttempt } from './quizzesService';
import {
    Menu, MenuItem, IconButton, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useSearchParams} from "react-router";

function QuizInfoModal({
                           open, onClose, quiz, isFacultyOrAdmin, onEdit, onPreview
                       }: {
    open: boolean;
    onClose: () => void;
    quiz: Quiz | null;
    isFacultyOrAdmin: boolean;
    onEdit: () => void;
    onPreview: () => void;
}) {
    if (!quiz) return null;
    // 通用格式化
    const fmt = (date?: string) =>
        date ? new Date(date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : "-";

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 0 }}>
                <Typography variant="h5" fontWeight="bold">{quiz.title}</Typography>
                <IconButton onClick={onClose}><span aria-label="close">✕</span></IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <Box display="flex" gap={1}><Box flex={1}><b>Quiz Type</b></Box><Box flex={2}>{quiz.quizType.replace(/_/g, " ").replace(/^\w/, c => c.toUpperCase())}</Box></Box>
                    <Box display="flex" gap={1}><Box flex={1}><b>Points</b></Box><Box flex={2}>{quiz.pointsTotal ?? "--"}</Box></Box>
                    <Box display="flex" gap={1}><Box flex={1}><b>Assignment Group</b></Box><Box flex={2}>{quiz.assignmentGroup?.toUpperCase()}</Box></Box>
                    <Box display="flex" gap={1}><Box flex={1}><b>Shuffle Answers</b></Box><Box flex={2}>{quiz.shuffleAnswers ? "Yes" : "No"}</Box></Box>
                    <Box display="flex" gap={1}><Box flex={1}><b>Time Limit</b></Box><Box flex={2}>{quiz.timeLimit} Minutes</Box></Box>
                    <Box display="flex" gap={1}><Box flex={1}><b>Multiple Attempts</b></Box><Box flex={2}>{quiz.multipleAttempts ? "Yes" : "No"}</Box></Box>
                    <Box display="flex" gap={1}><Box flex={1}><b>Show Correct Answers</b></Box><Box flex={2}>{quiz.showCorrectAnswers.replace(/_/g, " ").replace(/^\w/, c => c.toUpperCase())}</Box></Box>
                    <Box display="flex" gap={1}><Box flex={1}><b>One Question at a Time</b></Box><Box flex={2}>{quiz.oneQuestionAtATime ? "Yes" : "No"}</Box></Box>
                    <Box display="flex" gap={1}><Box flex={1}><b>Webcam Required</b></Box><Box flex={2}>{quiz.webcamRequired ? "Yes" : "No"}</Box></Box>
                    <Box display="flex" gap={1}><Box flex={1}><b>Lock Questions After Answering</b></Box><Box flex={2}>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</Box></Box>
                    <Box display="flex" gap={1} mb={2}><Box flex={1}><b>Availability</b></Box><Box flex={2}>
                        {quiz.availableDate ? `From ${fmt(quiz.availableDate)}` : "-"}&nbsp;/&nbsp;
                        {quiz.untilDate ? `Until ${fmt(quiz.untilDate)}` : "-"}
                    </Box></Box>
                    <Box display="flex" gap={1} mb={2}><Box flex={1}><b>Due</b></Box><Box flex={2}>{fmt(quiz.dueDate)}</Box></Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onPreview}>Preview</Button>
                {isFacultyOrAdmin && (
                    <Button variant="contained" color="primary" onClick={onEdit}>
                        Edit
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export function QuizzesList() {
    const { cid: courseId } = useParams<{ cid: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { list, loading, error } = useAppSelector((state: RootState) => state.quizzes);
    const user = useAppSelector((state: RootState) => state.account.currentUser);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuQuizId, setMenuQuizId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // 🔥 弹窗 Quiz 状态
    const [infoOpen, setInfoOpen] = useState(false);
    const [infoQuiz, setInfoQuiz] = useState<Quiz | null>(null);

    // 权限判断
    const isFacultyOrAdmin = user?.role === 'FACULTY' || user?.role === 'ADMIN';
    const visibleList = useMemo(() => {
        // 1. 先过滤（如果不是管理员只显示已发布）
        const arr = isFacultyOrAdmin ? list : list.filter(q => q.published);
        // 2. 再排序：availableDate 早的排前面，没有日期的排最后
        return [...arr].sort((a, b) => {
            const aDate = a.availableDate ? new Date(a.availableDate).getTime() : Infinity;
            const bDate = b.availableDate ? new Date(b.availableDate).getTime() : Infinity;
            return aDate - bDate;
        });
    }, [isFacultyOrAdmin, list]);

    // 分数表
    const [scoreMap, setScoreMap] = useState<{ [quizId: string]: number | undefined }>({});
    const [scoreLoading, setScoreLoading] = useState(false);
    const [searchParams] = useSearchParams();

    // 拉取 quiz 列表
    useEffect(() => {
        if (courseId) dispatch(fetchQuizzes(courseId));
    }, [courseId, dispatch]);

    // 拉取学生自己的成绩，每次 visibleList 或用户变化就拉
    const fetchStudentScores = useCallback(async () => {
        if (user?.role === "STUDENT" && courseId && visibleList.length) {
            setScoreLoading(true);
            try {
                const results = await Promise.all(
                    visibleList.map(async quiz => {
                        try {
                            const res = await getLatestAttempt(courseId, quiz._id);
                            return { quizId: quiz._id, score: res.data?.score ?? undefined };
                        } catch {
                            return { quizId: quiz._id, score: undefined };
                        }
                    })
                );
                const map: { [quizId: string]: number | undefined } = {};
                results.forEach(r => map[r.quizId] = r.score);
                setScoreMap(map);
            } finally {
                setScoreLoading(false);
            }
        } else {
            setScoreMap({});
            setScoreLoading(false);
        }
    }, [user?.role, courseId, visibleList]);

    useEffect(() => {
        const refreshParam = searchParams.get('refresh');
        if (refreshParam && user?.role === "STUDENT") {
            const timer = setTimeout(() => {
                fetchStudentScores();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [searchParams, user?.role, fetchStudentScores]);

    useEffect(() => {
        (async () => {
            await fetchStudentScores();
        })();
    }, [fetchStudentScores]);

    // 菜单等操作
    const openMenu = (e: MouseEvent<HTMLElement>, quizId: string) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
        setMenuQuizId(quizId);
    };

    const closeMenu = () => {
        setAnchorEl(null);
        setMenuQuizId(null);
    };

    const handleAdd = async () => {
        if (!courseId) return;
        setIsAdding(true);
        try {
            const resultAction = await dispatch(addQuiz(courseId));
            const newQuiz = unwrapResult(resultAction);
            navigate(`${newQuiz._id}`);
        } catch (err) {
            console.error('Failed to add quiz:', err);
        } finally {
            setIsAdding(false);
        }
    };

    const handleDelete = (quizId: string) => {
        if (courseId) {
            dispatch(removeQuiz({ courseId, quizId }));
        }
        closeMenu();
    };

    const handleTogglePublish = (quiz: Quiz) => {
        if (courseId) {
            dispatch(togglePublish({ courseId, quizId: quiz._id, publish: !quiz.published }));
        }
        closeMenu();
    };

    const handleEdit = (quizId: string) => {
        if (courseId) navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}`);
        closeMenu();
        setInfoOpen(false);
    };

    const handlePreview = (quizId: string) => {
        if (courseId) navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}/preview`);
        closeMenu();
        setInfoOpen(false);
    };

    // 🚩【1】弹窗打开逻辑：点整行弹窗
    const handleRowClick = (quizId: string) => {
        const quiz = visibleList.find(q => q._id === quizId) || null;
        setInfoQuiz(quiz);
        setInfoOpen(true);
    };

    return (
        <div>
            {/* Quiz 详情弹窗 */}
            <QuizInfoModal
                open={infoOpen}
                onClose={() => setInfoOpen(false)}
                quiz={infoQuiz}
                isFacultyOrAdmin={isFacultyOrAdmin}
                onEdit={() => infoQuiz && handleEdit(infoQuiz._id)}
                onPreview={() => infoQuiz && handlePreview(infoQuiz._id)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Quizzes</h2>
                {isFacultyOrAdmin && (
                    <Button
                        variant="contained"
                        onClick={handleAdd}
                        disabled={isAdding}
                    >
                        {isAdding ? 'Adding...' : '+ Quiz'}
                    </Button>
                )}
            </div>
            {loading && visibleList.length === 0 && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {visibleList.length === 0 && !loading ? (
                <p>No quizzes yet. {isFacultyOrAdmin ? 'Click "+ Quiz" to add one.' : ''}</p>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Availability</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Points</TableCell>
                            <TableCell>Questions</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleList.map((quiz: Quiz) => {
                            const now = new Date();
                            let availability: string;
                            if (quiz.availableDate && now < new Date(quiz.availableDate)) {
                                availability = `Not available until ${new Date(quiz.availableDate).toLocaleDateString()}`;
                            } else if (quiz.untilDate && now > new Date(quiz.untilDate)) {
                                availability = 'Closed';
                            } else {
                                availability = 'Available';
                            }
                            return (
                                <TableRow
                                    key={quiz._id}
                                    hover
                                    onClick={() => handleRowClick(quiz._id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <TableCell>
                                        {quiz.published ? '✅' : '🚫'} {quiz.title}
                                    </TableCell>
                                    <TableCell>{availability}</TableCell>
                                    <TableCell>
                                        {quiz.dueDate
                                            ? new Date(quiz.dueDate).toLocaleDateString()
                                            : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {quiz.pointsTotal ?? '--'} pts
                                    </TableCell>
                                    <TableCell>
                                        {quiz.questionsCount ?? '--'} Questions
                                    </TableCell>
                                    <TableCell>
                                        {user?.role === "STUDENT"
                                            ? (scoreLoading
                                                ? "Loading..."
                                                : (scoreMap[quiz._id] !== undefined ? `${scoreMap[quiz._id]}/${quiz.pointsTotal}` : "-"))
                                            : ""}
                                    </TableCell>
                                    <TableCell>
                                        {/* 学生可见 Take Quiz 按钮 */}
                                        {user?.role === "STUDENT" && quiz.published && (
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quiz._id}/take`);
                                                }}
                                                sx={{ mr: 1 }}
                                            >
                                                Take Quiz
                                            </Button>
                                        )}
                                        <IconButton size="small" onClick={e => { e.stopPropagation(); openMenu(e, quiz._id); }}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            )}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
                {/* Preview 所有人都能用 */}
                <MenuItem onClick={() => handlePreview(menuQuizId!)}>
                    Preview
                </MenuItem>
                {/* 下面三项只有教师和管理员能看到 */}
                {isFacultyOrAdmin && (
                    <>
                        <MenuItem onClick={() => handleEdit(menuQuizId!)}>
                            Edit
                        </MenuItem>
                        <MenuItem onClick={() => { if (menuQuizId) handleDelete(menuQuizId); }}>
                            Delete
                        </MenuItem>
                        <MenuItem onClick={() => {
                            const q = list.find((x: Quiz) => x._id === menuQuizId);
                            if (q) handleTogglePublish(q);
                        }}>
                            {list.find((x: Quiz) => x._id === menuQuizId)?.published ? 'Unpublish' : 'Publish'}
                        </MenuItem>
                    </>
                )}
            </Menu>
        </div>
    );
}