import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Message, Prisma, User } from '@prisma/client';
import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({ data });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already registered');
        }
      }

      if (error instanceof Error) {
        this.logger.error(`Error creating user: ${error.message}`, error.stack);
      } else {
        this.logger.error('Unknown error occurred while creating user', error);
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findMessages(userId: string): Promise<Message[]> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const userExists = await prisma.user.findUnique({
          where: { id: userId },
          select: { id: true },
        });

        if (!userExists) {
          throw new NotFoundException('User not found');
        }

        return prisma.message.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
        });
      });
    } catch (error: unknown) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      if (error instanceof Error) {
        this.logger.error(
          `Error finding user messages: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error(
          'Unknown error occurred while finding user messages',
          error,
        );
      }

      throw new InternalServerErrorException(
        'Failed to retrieve user messages',
      );
    }
  }
}
