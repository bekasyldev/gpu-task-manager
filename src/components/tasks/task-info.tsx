'use client';
import { 
    Clock, 
    Timer, 
    CheckCircle2, 
    Gauge, 
    Calendar 
} from 'lucide-react'; 

const TaskInfo: React.FC = () => {

    // const formatDateTime = (dateString: string) => {
    //     return format(new Date(dateString), 'MMM dd, yyyy HH:mm:ss');
    // };

    return (
        <div className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Task Information</h2>
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <p className="text-gray-700">
                        <span className="font-semibold">Start Time:</span>{' '}
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <Timer className="w-5 h-5 text-green-500" />
                    <p className="text-gray-700">
                        <span className="font-semibold">Range Processed:</span>{' '}
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500" />
                    <p className="text-gray-700">
                        <span className="font-semibold">Result:</span>{' '}
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <Gauge className="w-5 h-5 text-orange-500" />
                    <p className="text-gray-700">
                        <span className="font-semibold">Brute Speed:</span>{' '}
                        <span className="font-mono"></span> key/sec
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-teal-500" />
                    <p className="text-gray-700">
                        <span className="font-semibold">Current Time:</span>{' '}
                    
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TaskInfo;