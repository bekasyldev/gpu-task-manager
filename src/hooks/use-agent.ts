import { useEffect, useState } from 'react';
import { fetchAgents, addAgent, removeAgent } from '../lib/api/agent';
import { Agent } from '../types/agent';

const useAgents = () => {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAgents = async () => {
            try {
                const data = await fetchAgents();
                setAgents(data);
            } catch (err) {
                setError('Failed to load agents');
            } finally {
                setLoading(false);
            }
        };

        loadAgents();
    }, []);

    const addNewAgent = async (agent: Agent) => {
        try {
            await addAgent(agent);
            setAgents((prev) => [...prev, agent]);
        } catch (err) {
            setError('Failed to add agent');
        }
    };

    const deleteAgent = async (agentId: string) => {
        try {
            await removeAgent(agentId);
            setAgents((prev) => prev.filter(agent => agent.id !== agentId));
        } catch (err) {
            setError('Failed to remove agent');
        }
    };

    return { agents, loading, error, addNewAgent, deleteAgent };
};

export default useAgents;