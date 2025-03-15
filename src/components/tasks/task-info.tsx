'use client';
import { useTasks } from '@/hooks/use-tasks';
import { 
    Clock, 
    Timer, 
    CheckCircle2, 
    Gauge, 
    Calendar 
} from 'lucide-react'; 
import { format } from 'date-fns';

const TaskInfo: React.FC = () => {
    const { task, error } = useTasks();

    if (error) {
        return (
            <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
                <span className="text-red-500">Error fetching task information: {error}</span>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    const formatDateTime = (dateString: string) => {
        return format(new Date(dateString), 'MMM dd, yyyy HH:mm:ss');
    };

    return (
        <div className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Task Information</h2>
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <p className="text-gray-700">
                        <span className="font-semibold">Start Time:</span>{' '}
                        {formatDateTime(task.task_start_time)}
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <Timer className="w-5 h-5 text-green-500" />
                    <p className="text-gray-700">
                        <span className="font-semibold">Range Processed:</span>{' '}
                        {task.range_processed}
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500" />
                    <p className="text-gray-700">
                        <span className="font-semibold">Result:</span>{' '}
                        {task.task_result}
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <Gauge className="w-5 h-5 text-orange-500" />
                    <p className="text-gray-700">
                        <span className="font-semibold">Brute Speed:</span>{' '}
                        <span className="font-mono">{task.task_brute_speed.toFixed(2)}</span> key/sec
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-teal-500" />
                    <p className="text-gray-700">
                        <span className="font-semibold">Current Time:</span>{' '}
                        {formatDateTime(task.current_time)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TaskInfo;