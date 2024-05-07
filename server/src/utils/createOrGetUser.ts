import prisma from '../models/db.model';
import CustomError from '../errors/customError';

export default async function createOrGetUser(user: any) {
  if (!user) throw new CustomError('Internal server error', 404);

  const existingUser = await prisma.user.findUnique({
    where: {uid: user?.uid},
  });

  if (!existingUser) {
    return await prisma.user.create({
      data: {
        uid: user.uid,
        email: user?.email,
        profile: user?.picture,
        name: user?.name?.toLowerCase(),
      },
    });
  }

  return existingUser;
}
