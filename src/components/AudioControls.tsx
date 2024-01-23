const AudioControls = ({ onChangeVolume }) => {
    return (
        <div className="flex items-center justify-center space-x-4 p-4">
            <input
                type="range"
                min="-1"
                max="0"
                step="0.01"
                className="w-24"
                onChange={onChangeVolume} // Pass onChangeVolume to the input
            />
        </div>
    );
};

export default AudioControls;
