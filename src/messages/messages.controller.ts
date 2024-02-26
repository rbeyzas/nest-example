import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('/messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}
  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }
  @Post()
  createMessages(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
    // body.content CreateMessageDto içindeki contenti temsil eder
  }
  //   @Get('/:id')
  //   getMessages(@Param('id') id: string) {
  //     return this.messagesService.findOne(id);
  //   }

  @Get('/:id')
  async getMessages(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
    // eğer this.messagesService.findOne(id) değerini bir değişkene atarsak bir bekleme süresi ortaya çıkacak
    // bu durumda async ve await kullanmamız gerekecek
  }
}
// NotFoundException Nestin içinde bulunan bir hata sınıfıdır
