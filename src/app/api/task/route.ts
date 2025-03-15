import { NextResponse } from 'next/server';
import { getTasks } from '@/services/tasks';

export async function GET() {
    try {
        const agents = await getTasks();
        return NextResponse.json(agents);
    } catch (error) {
        console.error('Failed to fetch agents:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch agents' },
            { status: 500 }
        );
    }
}