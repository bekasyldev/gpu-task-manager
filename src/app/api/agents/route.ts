import { NextResponse } from 'next/server';
import { createAgent, getAgents, deleteAgent } from '@/services/agents';
import { z } from 'zod';

const AgentSchema = z.object({
    ip_address: z.string().ip({ version: 'v4' }),
    name: z.string().min(2).max(50)
});

export async function GET() {
    try {
        const agents = await getAgents();
        return NextResponse.json(agents);
    } catch (error) {
        console.error('Failed to fetch agents:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch agents' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = AgentSchema.parse(body);

        const agents = await getAgents();
        const existingAgent = agents.find(agent => agent.ip_address === validatedData.ip_address);

        if (existingAgent) {
            return NextResponse.json(
                { error: 'Agent with this IP address already exists' },
                { status: 400 }
            );
        }

        const agent = await createAgent(validatedData.ip_address, validatedData.name);
        return NextResponse.json(agent, { status: 201 });
    } catch (error) {
        console.error('Failed to create agent:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid agent data', details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to create agent' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const ipAddress = searchParams.get('ip');

        if (!ipAddress) {
            return NextResponse.json(
                { error: 'IP address is required' },
                { status: 400 }
            );
        }

        await deleteAgent(ipAddress);
        return NextResponse.json({ message: 'Agent deleted successfully' });
    } catch (error) {
        console.error('Failed to delete agent:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to delete agent' },
            { status: 500 }
        );
    }
} 