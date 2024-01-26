import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const BarToggle = ({ children }) => {
    const [showContent, setShowContent] = useState(false);

    return (
        <div className="relative w-full">
            {/* Content container with sliding animation */}
            <div
                className={`absolute top-0 w-full transform transition-transform duration-500 ease-in-out ${
                    showContent ? 'translate-y-0' : '-translate-y-full'
                }`}
                style={{ zIndex: 10 }}
            >
                {children}
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setShowContent(!showContent)}
                className="absolute p-2 text-xl bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
                style={{
                    top: showContent ? '100%' : '0', // Position the button depending on the content visibility
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20, // Ensure the button is above the content
                }}
            >
                {showContent ? <FaChevronDown /> : <FaChevronUp />}
            </button>
        </div>
    );
};

export default BarToggle;
