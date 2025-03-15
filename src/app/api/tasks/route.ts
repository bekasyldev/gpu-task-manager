import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
    createTask,
    getTasks,
    getTaskById,
    createSubTask,
    getSubTasks,
    stopTask
} from '@/services/tasks';
import { getAgents } from '@/services/agents';
import type { AgentInfo, GPUInfo, AgentInfoList } from '@/types';
import { randomUUID } from 'crypto';

type subTaskResult = {
    agent_ip: string;
    range_start: bigint;
    range_end: bigint;
};


const TaskSchema = z.object({
    encrypted_first_string: z.string(),
    iv_first_string: z.string(),
    encrypted_second_string: z.string(),
    iv_second_string: z.string(),
    range_start: z.string(),
    range_end: z.string(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate request body
        const validatedData = TaskSchema.parse(body);

        // Create the main task with string ranges
        const taskData = {
            ...validatedData,
            range_start: validatedData.range_start,
            range_end: validatedData.range_end,
        };
        const task = await createTask(taskData);

        // Get available agents
        const agents = await getAgents();
        if (agents.length === 0) {
            throw new Error('No agents available');
        }

        // get agents characteristics
        const agentsInfo: Promise<PromiseSettledResult<AgentInfo>[]> = Promise.allSettled(
            agents.map(async (agent): Promise<AgentInfo> => {
                const agentInfo: { devices: GPUInfo[] } = await fetch(`http://${agent.ip_address}/get_devices_info`).then(res => res.json());
                return {
                    ...agent,
                    ...agentInfo
                };
            })
        );

        const response = await agentsInfo;
        const successfulAgents: AgentInfoList = response
            .filter((result): result is PromiseFulfilledResult<AgentInfo> => result.status === "fulfilled")
            .map(result => result.value);

        // Sorting agents by devices length
        const sortedAgents = successfulAgents
            .map(agent => ({ ip_address: agent.ip_address, devices_count: agent.devices.length }))
            .sort((a, b) => b.devices_count - a.devices_count);

        // range difference
        const totalRange = task.range_end - task.range_start;
        const rangePerAgent = totalRange / BigInt(sortedAgents.length);
        let range_start = task.range_start;

        // hit /set_task endpoint for each agent
        const subTasks: subTaskResult[] = await Promise.all(
            sortedAgents.map(async (agent, index) => {
                const range_end =
                    index === sortedAgents.length - 1
                        ? task.range_end
                        : range_start + rangePerAgent * BigInt(agent.devices_count);

                await fetch(`http://${agent.ip_address}/set_task`, {
                    method: "POST",
                    body: JSON.stringify({
                        encrypted_first_string: task.encrypted_first_string,
                        iv_first_string: task.iv_first_string,
                        encrypted_second_string: task.encrypted_second_string,
                        iv_second_string: task.iv_second_string,
                        range_start: range_start,
                        range_end: range_end,
                    }),
                });

                // Store current range start and move it forward
                const subTask = {
                    agent_ip: agent.ip_address,
                    range_start: range_start,
                    range_end: range_end,
                };

                range_start = range_end;
                return subTask;
            })
        );

        // Convert subTasks to the correct format for createSubTasks
        const formattedSubTasks = subTasks.map((subtask) => ({
            id: randomUUID(),
            task_id: task.id,
            ip_address: subtask.agent_ip,
            encrypted_first_string: task.encrypted_first_string,
            iv_first_string: task.iv_first_string,
            encrypted_second_string: task.encrypted_second_string,
            iv_second_string: task.iv_second_string,
            range_start: subtask.range_start,
            range_end: subtask.range_end,
        }));

        // Call createSubTasks with formatted subtasks
        const result = formattedSubTasks.map(async (subtask) => {
            return await createSubTask(subtask);
        });

        return NextResponse.json({ result }, { status: 201 });
    } catch (error) {
        console.error('Failed to create task:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid task data', details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to create task' },
            { status: 500 }
        );
    }
}




export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const taskId = searchParams.get('taskId');

        if (taskId) {
            const [task, subtasks] = await Promise.all([
                getTaskById(taskId),
                getSubTasks(taskId)
            ]);
            return NextResponse.json({ task, subtasks });
        }
        const tasks = await getTasks();
        return NextResponse.json(tasks);
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch tasks' },
            { status: 500 }
        );
    }
}



export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const taskId = searchParams.get('taskId');

        if (!taskId) {
            return NextResponse.json(
                { error: 'Task ID is required' },
                { status: 400 }
            );
        }

        await stopTask(taskId);
        return NextResponse.json({ message: 'Task stopped successfully' });
    } catch (error) {
        console.error('Failed to stop task:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to stop task' },
            { status: 500 }
        );
    }
} 