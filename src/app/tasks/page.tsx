'use client';

import { Suspense } from 'react';
import TaskForm from '@/components/tasks/task-form';
import TaskList from '@/components/tasks/task-list';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TasksPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Task Management</h1>
            
            <Tabs defaultValue="tasks" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="new">New Task</TabsTrigger>
                </TabsList>

                <TabsContent value="tasks">
                    <Card className="p-6">
                        <Suspense fallback={<div>Loading tasks...</div>}>
                            <TaskList 
                                tasks={[]} 
                                onStopTask={(taskId) => {
                                    console.log('Stopping task:', taskId);
                                }}
                                onViewTask={(taskId) => {
                                    console.log('Viewing task:', taskId);
                                }}
                            />
                        </Suspense>
                    </Card>
                </TabsContent>

                <TabsContent value="new">
                    <Card className="p-6">
                        <TaskForm 
                            onSubmit={async (data) => {
                                console.log('Creating task:', data);
                            }}
                            agentCount={0}
                        />
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}