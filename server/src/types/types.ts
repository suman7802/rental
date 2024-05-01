import {Prisma} from '@prisma/client';

declare global {
  namespace Express {
    export interface User extends Prisma.UserFieldRefs {}
    export interface Unit extends Prisma.UnitFieldRefs {}
    export interface Image extends Prisma.ImageFieldRefs {}
    export interface Favorite extends Prisma.FavoriteFieldRefs {}
  }
}
