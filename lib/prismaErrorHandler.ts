import { Prisma } from "./generated/prisma";

import {
  NotFoundError,
  ConflictError,
  ValidationError,
  DatabaseError
} from './errors';

export function handlePrismaError(error: unknown, resource?: string): never {
  // why am not checking  error is instanceof Prisma.PrismaClientValidationError
  // read this plz: https://github.com/prisma/prisma/issues/12128
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    switch (prismaError.code) {
      case 'P2002': {
        const target = prismaError.meta?.target as string[] || [];
        throw new ConflictError(
          `Unique constraint violation on: ${target.join(', ')}`,
          prismaError.code
        );
      }
      case 'P2025':
        throw new NotFoundError(resource || 'Record');
      case 'P2003': {
        const field = prismaError.meta?.field_name as string;
        throw new ValidationError(
          `Foreign key constraint failed on field: ${field}`
        );
      }
      case 'P2016':
        throw new ValidationError('Query interpretation error');
      default:
        throw new DatabaseError(`Database error: ${error.code}`, prismaError.code);
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    throw new ValidationError('Invalid data provided to database operation');
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