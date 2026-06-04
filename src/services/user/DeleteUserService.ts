import prismaClient from "../../prisma/index.js";

export class DeleteUserService {
    async execute(idUser: string): Promise<boolean> {
        const result = await prismaClient.user.deleteMany({
            where: {
                id: idUser,
            },
        });

        return result.count > 0;
    }
}
