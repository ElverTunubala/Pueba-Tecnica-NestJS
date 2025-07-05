import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @IsString()
  userId: string;
}
