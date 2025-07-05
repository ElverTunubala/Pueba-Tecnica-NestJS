import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, Prisma } from '@prisma/client';
import { Logger } from '@nestjs/common';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: CreateMessageDto, includeUser = true): Promise<Message> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const user = await prisma.user.findUnique({
          where: { id: data.userId },
          select: { id: true },
        });

        if (!user) {
          throw new NotFoundException('User not found');
        }

        return prisma.message.create({
          data,
          include: { user: includeUser },
        });
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error creating message: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error('Unknown error occurred', error);
      }
      if (
        error instanceof NotFoundException || error instanceof BadRequestException
      ) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const errorMessage = error.meta?.message || 'Database operation failed';
        throw new BadRequestException(errorMessage);
      }
      throw new InternalServerErrorException('Failed to create message');
    }
  }
}
