import axios, { type AxiosResponse } from 'axios';

const API_BASE = '/api/courses';

/** ➊ A primitive value that any answer can take **/
export type AnswerValue = string | number | boolean;

/** Quiz DTOs **/
export interface Quiz {
    _id: string;
    courseId: string;
    title: string;
    description?: string;
    published: boolean;
    dueDate?: string;
    availableDate?: string;
    untilDate?: string;
    multipleAttempts: boolean;
    howManyAttempts?: number;
    quizType: 'graded_quiz' | 'practice_quiz' | 'graded_survey' | 'ungraded_survey';
    assignmentGroup: 'quizzes' | 'exams' | 'assignments' | 'project';
    shuffleAnswers: boolean;
    timeLimit: number;
    showCorrectAnswers: 'after_last_attempt' | 'immediately' | 'never';
    accessCode?: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    pointsTotal?: number;
    questionsCount?: number;
}

/** Question DTOs **/
export interface Question {
    _id: string;
    quizId: string;
    type: 'multiple_choice' | 'true_false' | 'fill_blank';
    title: string;
    points: number;
    question: string;
    choices?: { text: string; isCorrect: boolean }[];
    correctBoolean?: boolean;
    blanks?: string[];
}

/** ➋ Each submitted answer’s shape **/
export interface AttemptAnswer {
    questionId: string;
    answer: AnswerValue;
    correct: boolean;
    pointsAwarded: number;
}

/** Attempt DTO **/
export interface Attempt {
    _id: string;
    quizId: string;
    studentId: string;
    answers: AttemptAnswer[];
    score: number;
    createdAt: string;
}

/** Quizzes **/
export const getQuizzes = (courseId: string): Promise<AxiosResponse<Quiz[]>> =>
    axios.get(`${API_BASE}/${courseId}/quizzes`);

export const createQuiz = (courseId: string): Promise<AxiosResponse<Quiz>> =>
    axios.post(`${API_BASE}/${courseId}/quizzes`, {});

export const updateQuiz = (
    courseId: string,
    quizId: string,
    data: Partial<Quiz>
): Promise<AxiosResponse<Quiz>> =>
    axios.put(`${API_BASE}/${courseId}/quizzes/${quizId}`, data);

export const deleteQuiz = (
    courseId: string,
    quizId: string
): Promise<AxiosResponse<void>> =>
    axios.delete(`${API_BASE}/${courseId}/quizzes/${quizId}`);

export const publishQuiz = (
    courseId: string,
    quizId: string
): Promise<AxiosResponse<Quiz>> =>
    axios.post(`${API_BASE}/${courseId}/quizzes/${quizId}/publish`);

export const unpublishQuiz = (
    courseId: string,
    quizId: string
): Promise<AxiosResponse<Quiz>> =>
    axios.post(`${API_BASE}/${courseId}/quizzes/${quizId}/unpublish`);

export const getQuizDetails = (
    courseId: string,
    quizId: string
): Promise<AxiosResponse<Quiz>> =>
    axios.get(`${API_BASE}/${courseId}/quizzes/${quizId}`);

/** Questions **/
export const getQuizQuestions = (
    courseId: string,
    quizId: string
): Promise<AxiosResponse<Question[]>> =>
    axios.get(`${API_BASE}/${courseId}/quizzes/${quizId}/questions`);

export const saveQuestions = (courseId: string, quizId: string, questions: Question[]) => {
    const url = `${API_BASE}/${courseId}/quizzes/${quizId}/questions`;
    console.log('Calling saveQuestions URL:', url);
    console.log('Sending questions:', questions);
    return axios.post(url, questions);
};

export const addQuestion = (
    courseId: string,
    quizId: string,
    questionData: Partial<Question>
): Promise<AxiosResponse<Question>> =>
    axios.post(
        `${API_BASE}/${courseId}/quizzes/${quizId}/questions`,
        questionData
    );

export const updateQuestion = (
    courseId: string,
    quizId: string,
    questionId: string,
    updates: Partial<Question>
): Promise<AxiosResponse<Question>> =>
    axios.put(
        `${API_BASE}/${courseId}/quizzes/${quizId}/questions/${questionId}`,
        updates
    );

export const deleteQuestion = (
    courseId: string,
    quizId: string,
    questionId: string
): Promise<AxiosResponse<void>> =>
    axios.delete(
        `${API_BASE}/${courseId}/quizzes/${quizId}/questions/${questionId}`
    );

/** Attempts **/
export const getLatestAttempt = (
    courseId: string,
    quizId: string
): Promise<AxiosResponse<Attempt | null>> =>
    axios.get(`${API_BASE}/${courseId}/quizzes/${quizId}/attempts/latest`);

export const submitAttempt = (
    courseId: string,
    quizId: string,
    answers: AttemptAnswer[],
    score: number
): Promise<AxiosResponse<Attempt>> =>
    axios.post(`${API_BASE}/${courseId}/quizzes/${quizId}/attempts`, {
        answers,
        score,
    });

export const getAttemptsCount = (courseId: string, quizId: string) =>
    axios.get(`/api/courses/${courseId}/quizzes/${quizId}/attempts/count`);