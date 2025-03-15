import { Cpu, Timer } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SubTask } from '@/types';

interface SubTaskProps {
    subtask: SubTask;
}

export default function SubTaskCard({ subtask }: SubTaskProps) {
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US').format(num);
    };


    return (
        <Card className='p-4 space-y-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <Cpu className='w-4 h-4 text-gray-500' />
                    <span className='font-medium'>{subtask.ip_address}</span>
                </div>
            </div>

            <div className='space-y-2'>

                <div className='flex items-center justify-between text-sm'>
                    <div className='flex items-center space-x-1 text-gray-500'>
                        <Timer className='w-4 h-4' />
                        <span>Progress:</span>
                    </div>
                </div>
            </div>


            <div className='text-xs text-gray-500'>
                Range: {formatNumber(Number(subtask.range_start))} - {formatNumber(Number(subtask.range_end))}
            </div>
        </Card>
    );
} 