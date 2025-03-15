import { Cpu, Activity, Timer, Hash } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SubTask } from '@/types';

interface SubTaskProps {
    subtask: SubTask;
}

export default function SubTaskCard({ subtask }: SubTaskProps) {
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

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

    const getStatusColor = () => {
        if (!subtask.is_responding) return 'bg-red-100 text-red-800';
        if (subtask.result !== null) return 'bg-green-100 text-green-800';
        if (!subtask.is_working) return 'bg-yellow-100 text-yellow-800';
        return 'bg-blue-100 text-blue-800';
    };

    const getStatusText = () => {
        if (!subtask.is_responding) return 'Not Responding';
        if (subtask.result !== null) return 'Completed';
        if (!subtask.is_working) return 'Stopped';
        return 'Working';
    };

    return (
        <Card className='p-4 space-y-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <Cpu className='w-4 h-4 text-gray-500' />
                    <span className='font-medium'>{subtask.agent_ip}</span>
                </div>
                <Badge variant='secondary' className={getStatusColor()}>
                    {getStatusText()}
                </Badge>
            </div>

            <div className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                    <div className='flex items-center space-x-1 text-gray-500'>
                        <Activity className='w-4 h-4' />
                        <span>Speed:</span>
                    </div>
                    <span className='font-medium'>{formatSpeed(subtask.brute_speed)}</span>
                </div>

                <div className='flex items-center justify-between text-sm'>
                    <div className='flex items-center space-x-1 text-gray-500'>
                        <Timer className='w-4 h-4' />
                        <span>Progress:</span>
                    </div>
                    <span className='font-medium'>{subtask.brute_completed.toFixed(2)}%</span>
                </div>

                {subtask.result && (
                    <div className='flex items-center justify-between text-sm'>
                        <div className='flex items-center space-x-1 text-gray-500'>
                            <Hash className='w-4 h-4' />
                            <span>Found:</span>
                        </div>
                        <span className='font-medium font-mono'>{subtask.result}</span>
                    </div>
                )}
            </div>

            <Progress value={subtask.brute_completed} className='h-1' />

            <div className='text-xs text-gray-500'>
                Range: {formatNumber(Number(subtask.range_start))} - {formatNumber(Number(subtask.range_end))}
            </div>
        </Card>
    );
} 