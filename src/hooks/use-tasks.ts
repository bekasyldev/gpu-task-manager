"use client";

import { useState, useEffect } from 'react';
import { getTaskInfo, setTask, destroyTask } from '@/lib/api/tasks';
import { Task } from '../types/task';

export const useTasks = () => {
    const [task, setTaskState] = useState<Task | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);



    const fetchTaskInfo = async () => {
        setLoading(true);
        try {
            const taskInfo = await getTaskInfo();
            setTaskState(taskInfo);
        } catch (err: Error) {
            setError('Failed to fetch task information.');
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (taskParams: Omit<Task, 'id'>) => {
        setLoading(true);
        try {
            await setTask(taskParams);
            await fetchTaskInfo();
        } catch (err) {
            setError('Failed to set task.');
        } finally {
            setLoading(false);
        }
    };

    const removeTask = async () => {
        setLoading(true);
        try {
            await destroyTask();
            setTaskState(null);
        } catch (err) {
            setError('Failed to destroy task.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTaskInfo();
    }, []);

    return {
        task,
        loading,
        error,
        createTask,
        removeTask,
    };
};