import prismaClient from "../../prisma/index.js";

type TaskStatus = "PENDING" | "ACTIVE" | "DONE";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

interface TaskData {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    deadLine?: string;
    user_id: string;
}

export class CreateTaskService {
    async execute({
        title,
        description,
        status,
        priority,
        deadLine,
        user_id,
    }: TaskData) {
        const task = await prismaClient.task.create({
            data: {
                title,
                description: description ?? null,
                status: status,
                priority: priority,
                deadLine: deadLine ? new Date(deadLine) : null,
                user_id,
            },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                deadLine: true,
                createdAt: true,
            },
        });

        return task;
    }
}
