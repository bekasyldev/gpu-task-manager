import React from 'react';
import { StopCircle, Timer, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import TaskProgress from './task-progress';

interface TaskCardProps {
    taskId: string;
    agentCount: number;
    rangeStart: number;
    rangeEnd: number;
    progress: number;
    speed: number;
    startTime: string;
    status: 'running' | 'stopped' | 'completed' | 'not_responding';
    onStop: (taskId: string) => void;
    onView: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
    taskId,
    agentCount,
    rangeStart,
    rangeEnd,
    progress,
    speed,
    startTime,
    status,
    onStop,
    onView
}) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'running':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'stopped':
                return 'bg-red-100 text-red-800';
            case 'not_responding':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className={`bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow ${
            status === 'not_responding' ? 'opacity-75' : ''
        }`}>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Task #{taskId}</h3>
                    <p className="text-sm text-gray-500">Agents: {agentCount}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles()}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Range:</span>
                    <span className="font-medium">{rangeStart.toLocaleString()} - {rangeEnd.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                    <Timer className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Started: {new Date(startTime).toLocaleString()}</span>
                </div>
            </div>

            <TaskProgress 
                progress={progress}
                speed={speed}
                startTime={startTime}
            />

            <div className="mt-4 flex space-x-2">
                <Button 
                    variant="outline"
                    className="flex-1 flex items-center justify-center space-x-2"
                    onClick={() => onView(taskId)}
                >
                    <Eye className="w-4 h-4" />
                    <span>View Subtasks</span>
                </Button>

                {status === 'running' && (
                    <Button 
                        variant="destructive"
                        className="flex-1 flex items-center justify-center space-x-2"
                        onClick={() => onStop(taskId)}
                    >
                        <StopCircle className="w-4 h-4" />
                        <span>Stop Task</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
