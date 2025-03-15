'use client';

import { useState, useEffect } from 'react';
import { Plus, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import AgentList from '@/components/agents/agent-list';
import AgentForm from '@/components/agents/agent-form';
import AgentView from '@/components/agents/agent-view';
import { deviceInfo } from '@/mock/data';

interface Agent {
    ip_address: string;
    name?: string;
}

export default function Page() {   
    const [showForm, setShowForm] = useState(false);
    const [agents, setAgents] = useState<Agent[]>([]);
    const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            const response = await fetch('/api/agents');
            const data = await response.json();
            setAgents(data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAgent = async (data: { name: string; ip: string }) => {
        try {
            const response = await fetch('/api/agents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ip_address: data.ip,
                    name: data.name,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create agent');
            }

            await fetchAgents();
            setShowForm(false);
            toast.success("Agent created successfully");
        } catch (error) {
            console.error('Error creating agent:', error);
            toast.error(error instanceof Error ? error.message : "Failed to create agent");
        }
    };

    const handleDeleteAgent = async (ipAddress: string) => {
        try {
            const response = await fetch(`/api/agents?ip=${ipAddress}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete agent');
            }

            await fetchAgents();
            toast.success("Agent deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete agent");
        }
    };

    const handleAgentSelect = (ipAddress: string) => {
        setSelectedAgent(ipAddress);
    };

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='space-y-8'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                        <div className='p-2 bg-blue-100 rounded-full'>
                            <Server className='w-6 h-6 text-blue-600' />
                        </div>
                        <h2 className='font-bold text-2xl text-gray-800'>Agents</h2>
                    </div>
                    <Button 
                        variant='outline' 
                        className='flex items-center space-x-2'
                        onClick={() => setShowForm(!showForm)}
                    >
                        <Plus className='w-4 h-4' />
                        <span>{showForm ? 'Cancel' : 'New Agent'}</span>
                    </Button>
                </div>

                {showForm && (
                    <div className='bg-gray-50 p-6 rounded-lg'>
                        <AgentForm onSubmit={handleCreateAgent} />
                    </div>
                )}
                
                <div className='grid gap-6 lg:grid-cols-3'>
                    <div className='lg:col-span-2'>
                        {loading ? (
                            <div className="flex justify-center items-center p-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                        ) : agents.length > 0 ? (
                            <AgentList 
                                agents={agents} 
                                onAgentSelect={handleAgentSelect}
                                onAgentDelete={handleDeleteAgent}
                            />
                        ) : (
                            <div className="text-center py-8">
                                <Server className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">No agents available</p>
                            </div>
                        )}
                    </div>
                    <div>
                        {selectedAgent && (
                            <AgentView 
                                gpuName={deviceInfo[0].gpu_name}
                                totalGlobalMemoryMb={deviceInfo[0].total_global_memory_mb}
                                memoryClockMhz={deviceInfo[0].memory_clock_mhz}
                                gpuClockMhz={deviceInfo[0].gpu_clock_mhz}
                                taskStatus="running"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}