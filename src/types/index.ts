export interface Agent {
    ip_address: string;
    name: string;
}

export interface AgentTaskInfo {
    task_result: string | null;
    range_processed: string;
    global_worked_status: boolean;
}

export interface TaskPayload {
    encrypted_first_string: string;
    iv_first_string: string;
    encrypted_second_string: string;
    iv_second_string: string;
    range_start: string;
    range_end: string;
}

export interface Task {
    id: string;
    status: 'pending' | 'running' | 'completed' | 'stopped' | 'failed';
    created_at: Date;
    completed_at: Date | null;
    range_start: bigint;
    range_end: bigint;
    progress: number;
    result: string | null;
    encrypted_first_string: string;
    iv_first_string: string;
    encrypted_second_string: string;
    iv_second_string: string;
}

export interface SubTask {
    id: string;
    task_id: string;
    ip_address: string;
    encrypted_first_string: string;
    iv_first_string: string;
    encrypted_second_string: string;
    iv_second_string: string;
    range_start: bigint;
    range_end: bigint;
}

export interface CreateSubTask {
    task_id: string;
    ip_address: string;
    encrypted_first_string: string;
    iv_first_string: string;
    encrypted_second_string: string;
    iv_second_string: string;
    range_start: bigint;
    range_end: bigint;
}


type GPUInfo = {
    memory_page_size_kb: number;
    max_active_threads_per_sm: number;
    ecc_memory_supported: number;
    max_threads_per_block: number;
    num_async_copy_engines: number;
    max_threads_per_sm: number;
    local_memory_banks: number;
    multi_process_service_supported: number;
    max_threads_per_block_dim: [number, number, number];
    max_grid_size: [number, number, number];
    cooperative_groups_supported: number;
    memory_bus_width_bits: number;
    gpu_name: string;
    max_blocks_per_sm: number;
    num_multiprocessors: number;
    max_registers_per_block: number;
    memory_clock_mhz: number;
    total_global_memory_mb: number;
    l2_cache_size_kb: number;
    max_threads_per_gpu: number;
    gpu_clock_mhz: number;
    max_shared_memory_per_block_kb: number;
    cuda_compute_capability: string;
    unified_memory_supported: number;
    supports_preemption: number;
};

type AgentInfo = Agent & {
    devices: GPUInfo[];
};

type AgentInfoList = AgentInfo[];


// esline-disable-next-line
//
export type { AgentInfoList, AgentInfo, GPUInfo };