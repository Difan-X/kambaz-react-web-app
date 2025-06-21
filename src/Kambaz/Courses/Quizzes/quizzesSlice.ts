import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import * as service from './quizzesService.ts';
import type {Quiz, Question, Attempt} from './quizzesService.ts';

interface QuizzesState {
    list: Quiz[];
    currentQuiz: Quiz | null;
    questions: Question[];
    latestAttempt: Attempt | null;
    loading: boolean;
    error: string | null;
}

const initialState: QuizzesState = {
    list: [],
    currentQuiz: null,
    questions: [],
    latestAttempt: null,
    loading: false,
    error: null,
};

// Thunks
export const fetchQuizzes = createAsyncThunk(
    'quizzes/fetchQuizzes',
    async (courseId: string, { rejectWithValue }) => {
        try {
            const res = await service.getQuizzes(courseId);
            console.log('fetchQuizzes thunk got:', res.data);
            return res.data as Quiz[];
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
);

export const addQuiz = createAsyncThunk(
    'quizzes/addQuiz',
    async (courseId: string, { rejectWithValue }) => {
        try {
            const res = await service.createQuiz(courseId);
            return res.data as Quiz;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
);

export const updateQuiz = createAsyncThunk(
    'quizzes/updateQuiz',
    async (
        { courseId, quizId, data }: { courseId: string; quizId: string; data: Partial<Quiz> },
        { rejectWithValue }
    ) => {
        try {
            const res = await service.updateQuiz(courseId, quizId, data);
            return res.data as Quiz;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
);

export const removeQuiz = createAsyncThunk(
    'quizzes/removeQuiz',
    async (
        { courseId, quizId }: { courseId: string; quizId: string },
        { rejectWithValue }
    ) => {
        try {
            await service.deleteQuiz(courseId, quizId);
            return quizId;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
);

export const togglePublish = createAsyncThunk(
    'quizzes/togglePublish',
    async (
        { courseId, quizId, publish }: { courseId: string; quizId: string; publish: boolean },
        { rejectWithValue }
    ) => {
        try {
            const res = publish
                ? await service.publishQuiz(courseId, quizId)
                : await service.unpublishQuiz(courseId, quizId);
            return res.data as Quiz;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
);

export const fetchQuizDetails = createAsyncThunk(
    'quizzes/fetchQuizDetails',
    async (
        { courseId, quizId }: { courseId: string; quizId: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await service.getQuizDetails(courseId, quizId);
            return res.data as Quiz;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
);

export const fetchQuestions = createAsyncThunk(
    'quizzes/fetchQuestions',
    async (
        { courseId, quizId }: { courseId: string; quizId: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await service.getQuizQuestions(courseId, quizId);
            return res.data as Question[];
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
);

export const saveQuestions = createAsyncThunk(
    'quizzes/saveQuestions',
    async (
        { courseId, quizId, questions }: { courseId: string; quizId: string; questions: Question[] },
        { rejectWithValue }
    ) => {
        try {
            // Use the batch save endpoint instead of individual saves
            const res = await service.saveQuestions(courseId, quizId, questions);
            return res.data as Question[];
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
);

export const fetchLatestAttempt = createAsyncThunk(
    'quizzes/fetchLatestAttempt',
    async (
        { courseId, quizId }: { courseId: string; quizId: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await service.getLatestAttempt(courseId, quizId);
            return res.data as Attempt | null;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
);

export const submitAttempt = createAsyncThunk(
    'quizzes/submitAttempt',
    async (
        { courseId, quizId, answers, score }: { courseId: string; quizId: string; answers: Attempt['answers']; score: number },
        { rejectWithValue }
    ) => {
        try {
            const res = await service.submitAttempt(courseId, quizId, answers, score);
            return res.data as Attempt;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
);

// Slice
const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {
        clearCurrent(state) {
            state.currentQuiz = null;
            state.questions = [];
            state.latestAttempt = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchQuizzes
            .addCase(fetchQuizzes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuizzes.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchQuizzes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // addQuiz - 关键修复：确保loading状态正确更新
            .addCase(addQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addQuiz.fulfilled, (state, action) => {
                state.loading = false; // 关键：确保loading设为false
                state.list.push(action.payload);
                state.error = null; // 清除之前的错误
            })
            .addCase(addQuiz.rejected, (state, action) => {
                state.loading = false; // 关键：确保loading设为false
                state.error = action.payload as string;
            })

            // updateQuiz
            .addCase(updateQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateQuiz.fulfilled, (state, action) => {
                state.loading = false;
                const idx = state.list.findIndex(q => q._id === action.payload._id);
                if (idx !== -1) state.list[idx] = action.payload;
                state.error = null;
            })
            .addCase(updateQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // removeQuiz
            .addCase(removeQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((q) => q._id !== action.payload);
                state.error = null;
            })
            .addCase(removeQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // togglePublish
            .addCase(togglePublish.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(togglePublish.fulfilled, (state, action: PayloadAction<Quiz>) => {
                state.loading = false;
                const idx = state.list.findIndex((q) => q._id === action.payload._id);
                if (idx !== -1) state.list[idx] = action.payload;
                state.error = null;
            })
            .addCase(togglePublish.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // fetchQuizDetails
            .addCase(fetchQuizDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuizDetails.fulfilled, (state, action: PayloadAction<Quiz>) => {
                state.loading = false;
                state.currentQuiz = action.payload;
                state.error = null;
            })
            .addCase(fetchQuizDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // fetchQuestions
            .addCase(fetchQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
                state.loading = false;
                state.questions = action.payload;
                state.error = null;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // saveQuestions
            .addCase(saveQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
                state.loading = false;
                state.questions = action.payload;
                state.error = null;
            })
            .addCase(saveQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // fetchLatestAttempt
            .addCase(fetchLatestAttempt.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLatestAttempt.fulfilled, (state, action: PayloadAction<Attempt | null>) => {
                state.loading = false;
                state.latestAttempt = action.payload;
                state.error = null;
            })
            .addCase(fetchLatestAttempt.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // submitAttempt
            .addCase(submitAttempt.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitAttempt.fulfilled, (state, action: PayloadAction<Attempt>) => {
                state.loading = false;
                state.latestAttempt = action.payload;
                state.error = null;
            })
            .addCase(submitAttempt.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCurrent } = quizzesSlice.actions;
export default quizzesSlice.reducer;