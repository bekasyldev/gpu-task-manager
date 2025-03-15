export const deviceInfo = [
    {
        "memory_page_size_kb": 4,
        "max_active_threads_per_sm": 18,
        "ecc_memory_supported": 1,
        "max_threads_per_block": 1024,
        "num_async_copy_engines": 3,
        "max_threads_per_sm": 2048,
        "local_memory_banks": 640,
        "multi_process_service_supported": 1,
        "max_threads_per_block_dim": [1024, 1024, 64],
        "max_grid_size": [2147483647, 65535, 65535],
        "cooperative_groups_supported": 1,
        "memory_bus_width_bits": 5120,
        "gpu_name": "NVIDIA A100-SXM4-80GB",
        "max_blocks_per_sm": 32,
        "num_multiprocessors": 108,
        "max_registers_per_block": 65536,
        "memory_clock_mhz": 1593,
        "total_global_memory_mb": 81037,
        "l2_cache_size_kb": 40960,
        "max_threads_per_gpu": 221184,
        "gpu_clock_mhz": 1410,
        "max_shared_memory_per_block_kb": 48,
        "cuda_compute_capability": "8.0",
        "unified_memory_supported": 1,
        "supports_preemption": 1
    }
]


export const mockAgents = [
    {
        gpuName: "NVIDIA RTX 4090",
        totalGlobalMemoryMb: 24576,
        memoryClockMhz: 21000,
        gpuClockMhz: 2520,
        taskStatus: "running",
    },
    {
        gpuName: "AMD Radeon RX 7900 XTX",
        totalGlobalMemoryMb: 24576,
        memoryClockMhz: 2500,
        gpuClockMhz: 2400,
        taskStatus: "idle",
    },
    {
        gpuName: "NVIDIA A100",
        totalGlobalMemoryMb: 40960,
        memoryClockMhz: 1215,
        gpuClockMhz: 1410,
        taskStatus: "running",
    },
];



// Mock tasks data 
export const mockTasks = [
    {
        taskId: "1",
        agentCount: 3,
        rangeStart: 6492072705177784,
        rangeEnd: 6492782705177784,
        progress: 64.9,
        speed: 6444386219.68,
        startTime: "2025-03-06 12:36:27",
        status: 'running',
    },
    {
        taskId: "2",
        agentCount: 2,
        rangeStart: 5492072705177784,
        rangeEnd: 5492782705177784,
        progress: 100,
        speed: 5444386219.68,
        startTime: "2025-03-06 11:36:27",
        status: 'completed',
    },
    {
        taskId: "3",
        agentCount: 1,
        rangeStart: 4492072705177784,
        rangeEnd: 4492782705177784,
        progress: 45.5,
        speed: 0,
        startTime: "2025-03-06 12:16:27",
        status: 'not_responding',
    }
];