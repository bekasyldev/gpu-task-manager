import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SubTask } from '@/types';
import SubTaskCard from './subtask-card';

interface SubTaskListProps {
    taskId: string;
    subtasks: SubTask[];
    onBack: () => void;
}

export default function SubTaskList({ taskId, subtasks, onBack }: SubTaskListProps) {
    // Filter subtasks by status
    const workingSubtasks = subtasks.filter(subtask => subtask.is_working);
    const stoppedSubtasks = subtasks.filter(subtask => !subtask.is_working);
    const notRespondingSubtasks = subtasks.filter(subtask => !subtask.is_responding);
    const completedSubtasks = subtasks.filter(subtask => subtask.result !== null);

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-4'>
                    <Button 
                        variant='ghost' 
                        size='icon'
                        onClick={onBack}
                    >
                        <ArrowLeft className='w-4 h-4' />
                    </Button>
                    <h3 className='font-semibold text-lg'>Task {taskId} Subtasks</h3>
                </div>
                <div className='flex items-center space-x-4 text-sm'>
                    <div>Working: {workingSubtasks.length}</div>
                    <div>Stopped: {stoppedSubtasks.length}</div>
                    <div>Not Responding: {notRespondingSubtasks.length}</div>
                    <div>Completed: {completedSubtasks.length}</div>
                </div>
            </div>

            {subtasks.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    No subtasks available for this task.
                </div>
            ) : (
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {subtasks.map((subtask) => (
                        <SubTaskCard
                            key={subtask.id}
                            subtask={subtask}
                        />
                    ))}
                </div>
            )}
        </div>
    );
} 