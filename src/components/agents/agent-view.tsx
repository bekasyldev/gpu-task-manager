import React from 'react';
import { Cpu, Clock, Activity, MemoryStick } from 'lucide-react';

interface AgentCardProps {
    gpuName: string;
    totalGlobalMemoryMb: number;
    memoryClockMhz: number;
    gpuClockMhz: number;
    taskStatus: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ gpuName, totalGlobalMemoryMb, memoryClockMhz, gpuClockMhz, taskStatus }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{gpuName}</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    taskStatus === 'running' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                }`}>
                    <Activity className="w-4 h-4 inline-block mr-1" />
                    {taskStatus}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MemoryStick className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-500">Total Memory</p>
                        <p className="font-medium">{totalGlobalMemoryMb} MB</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-500">Memory Clock</p>
                        <p className="font-medium">{memoryClockMhz} MHz</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-500">GPU Clock</p>
                        <p className="font-medium">{gpuClockMhz} MHz</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentCard;