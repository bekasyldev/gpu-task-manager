import { Agent } from '@/types';
import db from "@/lib/db";

export interface DbError extends Error {
    code: string;
}

export async function createAgent(ip_address: string, name: string): Promise<Agent> {
    try {
        const result = await db.query(
            `INSERT INTO agents (
                ip_address,
                name,
            ) VALUES ($1, $2) RETURNING *`,
            [ip_address, name]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Failed to create agent:', error);
        throw new Error('Failed to create agent');
    }
}

export async function getAgents(): Promise<Agent[]> {
    try {
        const result = await db.query('SELECT * FROM agents');
        return result.rows;
    } catch (error) {
        console.error('Failed to fetch agents:', error);
        throw new Error('Failed to fetch agents');
    }
}

export async function getAgentByIpAddress(ip_address: string): Promise<Agent> {
    try {
        const result = await db.query('SELECT * FROM agents WHERE ip_address = $1', [ip_address]);
        return result.rows[0];
    } catch (error) {
        console.error('Failed to fetch agent:', error);
        throw new Error('Failed to fetch agent');
    }
}

export async function deleteAgent(ip_address: string): Promise<void> {
    try {
        await db.query('DELETE FROM agents WHERE ip_address = $1', [ip_address]);
    } catch (error) {
        console.error('Failed to delete agent:', error);
        throw new Error('Failed to delete agent');
    }
}