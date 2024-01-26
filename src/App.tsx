import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import React from 'react';

const App: React.FC = () => {
    return (
        <BrowserRouter basename="/wb24">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/:trackID" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
