import { Request, Response } from "express";
import { CreateExpenseService } from "../../services/expense/CreateExpenseService.js";

export class CreateExpenseController {
    async handle(req: Request, res: Response) {
        const { description, amount, date, category } = req.body;
        const idUser = req.userId as string;
        const createExpenseService = new CreateExpenseService();
        try {
            let parsedAmount: number;
            if (typeof amount === "string") {
                parsedAmount = Number(String(amount).replace(",", "."));
            } else {
                parsedAmount = amount as number;
            }

            if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
                return res.status(400).json({ error: "Invalid amount" });
            }

            const expense = await createExpenseService.execute({
                description,
                amount: parsedAmount,
                date,
                category,
                idUser,
            });

            return res.status(201).json(expense);
        } catch (error) {
            return res.status(500).json({ error: "Failed to create expense" });
        }
    }
}
