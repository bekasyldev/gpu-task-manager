import React from 'react';
import { Server, Network } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const agentFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    ip: z.string()
        .ip({ version: 'v4', message: 'Please enter a valid IPv4 address' })
});

type AgentFormData = z.infer<typeof agentFormSchema>;

interface AgentFormProps {
    onSubmit: (data: AgentFormData) => void;
    initialData?: AgentFormData;
}

const AgentForm: React.FC<AgentFormProps> = ({ onSubmit, initialData }) => {
    const form = useForm<AgentFormData>({
        resolver: zodResolver(agentFormSchema),
        defaultValues: initialData || {
            name: '',
            ip: '',
        },
    });

    const handleSubmit = (data: AgentFormData) => {
        onSubmit(data);
        if (!initialData) {
            form.reset();
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                                <Server className="w-4 h-4 text-blue-600" />
                                <span>Agent Name</span>
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Enter agent name" 
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="ip"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                                <Network className="w-4 h-4 text-blue-600" />
                                <span>Agent IP</span>
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Enter IP address (e.g., 192.168.1.1)" 
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit" 
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                >
                    {initialData ? 'Update Agent' : 'Add Agent'}
                </Button>
            </form>
        </Form>
    );
};

export default AgentForm;