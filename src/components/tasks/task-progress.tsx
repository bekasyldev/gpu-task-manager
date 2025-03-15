import React, { useEffect, useState } from 'react';
import { Timer, Gauge } from 'lucide-react';

interface TaskProgressProps {
    progress: number; // Progress percentage (0-100)
    speed: number; // Speed of the task
    startTime: string; // Start time of the task
}

const TaskProgress: React.FC<TaskProgressProps> = ({ progress, speed, startTime }) => {
    const [elapsedTime, setElapsedTime] = useState<string>('00:00:00');

    useEffect(() => {
        const updateElapsedTime = () => {
            const start = new Date(startTime).getTime();
            const now = new Date().getTime();
            const elapsed = now - start;

            const hours = Math.floor(elapsed / (1000 * 60 * 60));
            const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

            setElapsedTime(
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
        };

        const timer = setInterval(updateElapsedTime, 1000);
        return () => clearInterval(timer);
    }, [startTime]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Timer className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">Elapsed Time: {elapsedTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Gauge className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">{speed.toFixed(2)} key/s</span>
                </div>
            </div>

            <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
                        style={{ 
                            width: `${progress}%`,
                            background: `linear-gradient(90deg, rgb(59, 130, 246) 0%, rgb(147, 197, 253) 100%)`
                        }}
                    />
                </div>
                <span className="absolute right-0 top-2 text-xs font-medium text-gray-500">
                    {progress}%
                </span>
            </div>
        </div>
    );
};

export default TaskProgress;