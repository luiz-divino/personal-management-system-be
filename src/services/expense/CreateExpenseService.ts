import prismaClient from "../../prisma/index.js";

interface CreateExpenseProps {
    description: string;
    amount: number;
    date: string;
    category: string;
    idUser: string;
}

export class CreateExpenseService {
    async execute({
        description,
        amount,
        date,
        category,
        idUser,
    }: CreateExpenseProps) {
        const expense = await prismaClient.expense.create({
            data: {
                description,
                amount,
                date: new Date(date),
                category,
                user_id: idUser,
            },
            select: {
                id: true,
                description: true,
                amount: true,
                category: true,
                date: true,
            },
        });
        return expense;
    }
}
