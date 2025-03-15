import { create } from 'zustand';

interface Agent {
    id: string;
    gpuName: string;
    totalMemory: number;
    usedMemory: number;
    status: string;
}

interface AgentsState {
    agents: Agent[];
    addAgent: (agent: Agent) => void;
    removeAgent: (id: string) => void;
    setAgents: (agents: Agent[]) => void;
}

export const useAgentsStore = create<AgentsState>((set) => ({
    agents: [],
    addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
    removeAgent: (id) => set((state) => ({ agents: state.agents.filter(agent => agent.id !== id) })),
    setAgents: (agents) => set({ agents }),
}));