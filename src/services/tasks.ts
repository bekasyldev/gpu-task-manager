import { QueryResult } from "pg";
import db from '@/lib/db';
import { Task, SubTask, TaskPayload } from '@/types';

// Mock agent endpoints for development
const mockAgentEndpoints = {
    getDevicesInfo: async () => {
        return {
            devices: [
                {
                    name: 'NVIDIA GeForce RTX 3080',
                    memory: '10GB',
                    cuda_cores: 8704
                }
            ]
        };
    },

    getTaskInfo: async () => {
        return {
            task_result: null,
            range_processed: '1000',
            global_worked_status: true
        };
    },

    setTask: async () => {
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API call
        return { success: true };
    },

    destroyTask: async () => {
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API call
        return { success: true };
    }
};

export async function createTask(taskData: TaskPayload): Promise<Task> {
    try {
        const result = await db.query(
            `INSERT INTO tasks (
                encrypted_first_string,
                iv_first_string,
                encrypted_second_string,
                iv_second_string,
                range_start,
                range_end,
                status,
                progress,
                result,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [
                taskData.encrypted_first_string,
                taskData.iv_first_string,
                taskData.encrypted_second_string,
                taskData.iv_second_string,
                taskData.range_start,
                taskData.range_end,
                'pending',
                0,
                null,
                new Date()
            ]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

export async function getTasks(): Promise<Task[]> {
    const query = 'SELECT * FROM Task ORDER BY created_at DESC';
    try {
        const result: QueryResult<Task> = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        throw new Error('Failed to fetch tasks');
    }
}

export async function getTaskById(taskId: string): Promise<Task> {
    const query = 'SELECT * FROM Task WHERE id = $1';
    try {
        const result: QueryResult<Task> = await db.query(query, [taskId]);
        if (result.rows.length === 0) {
            throw new Error('Task not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Failed to fetch task:', error);
        throw new Error('Failed to fetch task');
    }
}

export async function updateTaskStatus(taskId: string, status: Task['status']): Promise<Task> {
    const query = `
        UPDATE Task 
        SET status = $1, 
            completed_at = $2
        WHERE id = $3 
        RETURNING *
    `;

    const values = [
        status,
        status === 'completed' ? new Date().toISOString() : null,
        taskId
    ];

    try {
        const result: QueryResult<Task> = await db.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Task not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Failed to update task status:', error);
        throw new Error('Failed to update task status');
    }
}

export async function createSubTask(subTask: SubTask): Promise<SubTask> {
    try {
        // Get task info to calculate ranges
        const task = await getTaskById(subTask.task_id);
        if (!task) {
            throw new Error('Task not found');
        }

        const subtask = await db.query(
            `INSERT INTO subtasks (
                    id
                    task_id, 
                    ip_address,
                    iv_first_string,
                    iv_second_string,
                    encrypted_first_string,
                    encrypted_second_string,
                    range_start,
                    range_end,
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [
                subTask.id,
                subTask.task_id,
                subTask.ip_address,
                subTask.iv_first_string,
                subTask.iv_second_string,
                subTask.encrypted_first_string,
                subTask.encrypted_second_string,
                subTask.range_start,
                subTask.range_end,
            ]
        );

        return subtask.rows[0];
    } catch (error) {
        console.error('Error creating subtask:', error);
        throw error;
    }
}

export async function getSubTasks(taskId: string): Promise<SubTask[]> {
    const query = 'SELECT * FROM Subtask WHERE task_id = $1 ORDER BY created_at';
    try {
        const result: QueryResult<SubTask> = await db.query(query, [taskId]);
        return result.rows;
    } catch (error) {
        console.error('Failed to fetch subtasks:', error);
        throw new Error('Failed to fetch subtasks');
    }
}

export async function stopTask(taskId: string): Promise<void> {
    try {
        // Get all subtasks for this task
        const subtasks = await getSubTasks(taskId);

        // Stop each agent's task
        for (const subtask of subtasks) {
            try {
                await mockAgentEndpoints.destroyTask();
            } catch (error) {
                console.error(`Failed to stop task on agent ${subtask.ip_address}:`, error);
            }
        }

        // Update task status
        await updateTaskStatus(taskId, 'stopped');
    } catch (error) {
        console.error('Failed to stop task:', error);
        throw new Error('Failed to stop task');
    }
}