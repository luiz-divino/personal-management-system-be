import { Request, Response } from "express";
import { DeleteExpenseService } from "../../services/expense/DeleteExpenseService.js";

export class DeleteExpenseController {
    async handle(req: Request, res: Response): Promise<void> {
        const { expenseId } = req.params;
        const deleteExpense = new DeleteExpenseService();
        const expense = deleteExpense.execute(expenseId as string);
        res.status(204).json(expense);
    }
}
