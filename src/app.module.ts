import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, MessagesModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
