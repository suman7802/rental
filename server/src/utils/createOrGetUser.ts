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
        uid: user?.uid,
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        verified: user?.email_verified,
      },
    });
    return newUser;
  }
  return fetchUser;
}
