import { Request, Response } from "express";
import { ListTaskService } from "../../services/task/ListTaskService.js";

export class ListTaskController {
    async handle(req: Request, res: Response) {
        const user_id = req.userId as string;
        const { status, priority, search, page, limit } = req.query;

        const service = new ListTaskService();
        const tasks = await service.execute({
            user_id,
            status: status as "PENDING" | "ACTIVE" | "DONE" | undefined,
            priority: priority as "LOW" | "MEDIUM" | "HIGH" | undefined,
            search: search as string | undefined,
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        });

        return res.json(tasks);
    }
}

export const listTaskController = new ListTaskController();
