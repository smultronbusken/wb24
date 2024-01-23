const TrackControls = ({ track, onNext, onPrev, onTogglePlay, isPlaying }) => {
    return (
        <div className="flex items-center justify-center space-x-4 p-4">
            <button onClick={onPrev} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Prev
            </button>
            <button
                onClick={onTogglePlay}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button onClick={onNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Next
            </button>
            <span className="text-lg">{track ? track.title : 'No Track'}</span>
        </div>
    );
};

export default TrackControls;
