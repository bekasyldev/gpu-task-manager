import { Eye, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Task {
    taskId: string;
    agentCount: number;
    rangeStart: string;
    rangeEnd: string;
    progress: number;
    speed: number;
    startTime: string;
    status: 'running' | 'stopped' | 'completed' | 'not_responding';
}

interface TaskListProps {
    tasks: Task[];
    onStopTask: (taskId: string) => void;
    onViewTask: (taskId: string) => void;
}

export default function TaskList({ tasks, onStopTask, onViewTask }: TaskListProps) {
    const formatSpeed = (speed: number) => {
        if (speed >= 1_000_000_000) {
            return `${(speed / 1_000_000_000).toFixed(2)}B/s`;
        }
        if (speed >= 1_000_000) {
            return `${(speed / 1_000_000).toFixed(2)}M/s`;
        }
        if (speed >= 1_000) {
            return `${(speed / 1_000).toFixed(2)}K/s`;
        }
        return `${speed.toFixed(2)}/s`;
    };

    const getStatusColor = (status: Task['status']) => {
        switch (status) {
            case 'running':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'stopped':
                return 'bg-yellow-100 text-yellow-800';
            case 'not_responding':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-4">
            {tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No tasks available. Create a new task to get started.
                </div>
            ) : (
                tasks.map((task) => (
                    <Card key={task.taskId} className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-lg font-semibold">Task #{task.taskId}</h3>
                                    <Badge variant="secondary" className={getStatusColor(task.status)}>
                                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Started {new Date(task.startTime).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                {task.status === 'running' && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onStopTask(task.taskId)}
                                    >
                                        <StopCircle className="w-4 h-4 mr-2" />
                                        Stop
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onViewTask(task.taskId)}
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Agents</p>
                                    <p className="font-medium">{task.agentCount}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Speed</p>
                                    <p className="font-medium">{formatSpeed(task.speed)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Progress</p>
                                    <p className="font-medium">{task.progress.toFixed(2)}%</p>
                                </div>
                            </div>

                            <Progress value={task.progress} className="h-1" />

                            <div className="text-xs text-gray-500">
                                Range: {task.rangeStart} - {task.rangeEnd}
                            </div>
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
}
