import { Prisma } from "./generated/prisma";

import {
  DatabaseError
} from './errors';

export function handlePrismaError(error: unknown): never {
  // why am not checking  error is instanceof Prisma.PrismaClientValidationError
  // read this plz: https://github.com/prisma/prisma/issues/12128
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    throw prismaError

  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new DatabaseError('Database connection failed', 'INIT_FAILED');
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    throw new DatabaseError('Unknown database request error');
  } else if (error instanceof Error) {
    throw new DatabaseError(error.message);
  } else {
    throw new DatabaseError('Unknown error occurred');
  }
}