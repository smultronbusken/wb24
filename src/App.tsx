import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import React from 'react';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
