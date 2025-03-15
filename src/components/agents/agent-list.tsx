import React from 'react';
import { Eye, Trash2, Network } from 'lucide-react';
import { Button } from '../ui/button';

interface Agent {
    ip_address: string;
    name?: string;
}

interface AgentListProps {
    agents: Agent[];
    onAgentSelect: (ipAddress: string) => void;
    onAgentDelete: (ipAddress: string) => void;
}

const AgentList: React.FC<AgentListProps> = ({ agents, onAgentSelect, onAgentDelete }) => {
    return (
        <div className="space-y-4">
            {agents.map((agent) => (
                <div 
                    key={agent.ip_address}
                    className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <Network className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    {agent.name || 'Unnamed Agent'}
                                </h3>
                                <p className="text-sm text-gray-500">{agent.ip_address}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onAgentSelect(agent.ip_address)}
                                className="flex items-center space-x-2"
                            >
                                <Eye className="w-4 h-4" />
                                <span>View</span>
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onAgentDelete(agent.ip_address)}
                                className="flex items-center space-x-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AgentList;