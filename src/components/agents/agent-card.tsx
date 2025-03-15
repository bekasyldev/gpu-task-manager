import React from 'react';
import { Button } from '../ui/button';
import { Server, Eye, Trash } from 'lucide-react';

interface AgentCardProps {
    ipAddress: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ ipAddress }: AgentCardProps) => {
    return (
        <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                    <Server className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{ipAddress}</h2>
                    <p className="text-sm text-gray-500">Server Agent</p>
                </div>
            </div>
            <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-1 border-red-500">
                    <Trash className="w-4 h-4" color='red' />
                    <span className='text-red-500'>Delete</span>
                </Button>
            </div>
        </div>
    );
};

export default AgentCard;