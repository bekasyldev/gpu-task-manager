"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Hash, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

const taskFormSchema = z.object({
    encryptedFirstString: z.string().min(1, 'First encrypted string is required'),
    ivFirstString: z.string().min(1, 'First IV string is required'),
    encryptedSecondString: z.string().min(1, 'Second encrypted string is required'),
    ivSecondString: z.string().min(1, 'Second IV string is required'),
    rangeStart: z.string().regex(/^\d+$/, 'Must be a valid number'),
    rangeEnd: z.string().regex(/^\d+$/, 'Must be a valid number'),
}).refine((data) => {
    const start = BigInt(data.rangeStart);
    const end = BigInt(data.rangeEnd);
    return end > start;
}, {
    message: "Range end must be greater than range start",
    path: ["rangeEnd"],
});

type TaskFormData = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
    onSubmit: (data: TaskFormData) => void;
    agentCount: number;
}

export default function TaskForm({ onSubmit, agentCount }: TaskFormProps) {
    const form = useForm<TaskFormData>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            encryptedFirstString: '',
            ivFirstString: '',
            encryptedSecondString: '',
            ivSecondString: '',
            rangeStart: '',
            rangeEnd: '',
        },
    });

    const handleSubmit = (data: TaskFormData) => {
        onSubmit(data);
        form.reset();
    };

    return (
        <Card>
            <CardHeader>
                <h3 className="text-lg font-semibold">Create New Task</h3>
                <p className="text-sm text-muted-foreground">
                    Enter the encryption details and range for the task.
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="encryptedFirstString"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center space-x-2">
                                            <Lock className="w-4 h-4" />
                                            <span>First Encrypted String</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter first encrypted string" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ivFirstString"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center space-x-2">
                                            <Hash className="w-4 h-4" />
                                            <span>First IV String</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter first IV string" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="encryptedSecondString"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center space-x-2">
                                            <Lock className="w-4 h-4" />
                                            <span>Second Encrypted String</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter second encrypted string" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ivSecondString"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center space-x-2">
                                            <Hash className="w-4 h-4" />
                                            <span>Second IV String</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter second IV string" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="rangeStart"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center space-x-2">
                                            <ArrowRight className="w-4 h-4" />
                                            <span>Range Start</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter range start" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="rangeEnd"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center space-x-2">
                                            <ArrowRight className="w-4 h-4" />
                                            <span>Range End</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter range end" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <CardFooter className="px-0 pb-0">
                            <div className="flex items-center justify-between w-full">
                                <div className="text-sm text-muted-foreground">
                                    Available Agents: <span className="font-medium">{agentCount}</span>
                                </div>
                                <Button 
                                    type="submit"
                                    disabled={form.formState.isSubmitting}
                                >
                                    Create Task
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}