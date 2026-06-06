import prismaClient from "../../prisma/index.js";

export class DeleteExpenseService {
    async execute(expenseId: string): Promise<void> {
        try {
            await prismaClient.expense.delete({
                where: {
                    id: expenseId,
                },
                select: {
                    id: true,
                    title: true,
                }
            })
        } catch (error) {
              throw new Error(
                `Failed to delete expense with id ${expenseId}: ${error}`,
            );
        }
    }
}
