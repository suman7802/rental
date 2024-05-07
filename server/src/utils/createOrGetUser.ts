import prisma from '../models/db.model';
import CustomError from '../errors/customError';

export default async function createOrGetUser(user: any) {
  if (!user) throw new CustomError('Internal server error', 404);

  const fetchUser = await prisma.user.findUnique({
    where: {uid: user?.uid},
  });

  if (!fetchUser) {
    const newUser = await prisma.user.create({
      data: {
        uid: user.uid,
        email: user?.email,
        picture: user?.picture,
        verified: user?.email_verified,
        name: user?.name?.toLowerCase(),
      },
    });

    return newUser;
  }
  return fetchUser;
}
