import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from "../../Account/ProtectedRoute";

import {QuizzesList} from './QuizzesList';
import {QuizDetails} from './QuizDetails';
import QuizDetailsEditor  from './QuizDetailsEditor';
import QuizQuestionsEditor from './QuizQuestionsEditor';
import QuizPreview        from './QuizPreview';
import QuizTaking         from './QuizTaking';
import {QuizResults} from './QuizResults';
import QuizDetailsScreen from "./QuizDetailsScreen";


export default function Quizzes() {
    return (
        <Routes>
            <Route index element={<QuizzesList />} />
            <Route path=":quizId" element={<QuizDetailsEditor />} />
            <Route path=":quizId/preview" element={<QuizPreview />} />
            <Route path=":quizId/details" element={<QuizDetailsScreen />} />

            {/* Faculty & Admin */}
            <Route
                path="create"
                element={
                    <ProtectedRoute roles={["FACULTY", "ADMIN"]}>
                        <QuizDetailsEditor />
                    </ProtectedRoute>
                }
            />
            <Route
                path=":quizId/edit"
                element={
                    <ProtectedRoute roles={["FACULTY", "ADMIN"]}>
                        <QuizDetailsEditor />
                    </ProtectedRoute>
                }
            />
            <Route
                path=":quizId/questions"
                element={
                    <ProtectedRoute roles={["FACULTY", "ADMIN"]}>
                        <QuizQuestionsEditor />
                    </ProtectedRoute>
                }
            />
            <Route
                path=":quizId/preview"
                element={
                    <ProtectedRoute roles={["FACULTY", "ADMIN"]}>
                        <QuizPreview />
                    </ProtectedRoute>
                }
            />

            {/* Shared detail view */}
            <Route path=":quizId" element={<QuizDetails />} />

            {/* Student-only */}
            <Route
                path=":quizId/take"
                element={
                    <ProtectedRoute role="STUDENT">
                        <QuizTaking />
                    </ProtectedRoute>
                }
            />
            <Route
                path=":quizId/results"
                element={
                    <ProtectedRoute role="STUDENT">
                        <QuizResults />
                    </ProtectedRoute>
                }
            />

            {/* catch‐all */}
            <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
    );
}