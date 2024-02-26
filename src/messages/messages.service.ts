import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(public messagesRepo: MessagesRepository) {}
  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }
  findAll() {
    return this.messagesRepo.findAll();
  }
  create(message: string) {
    return this.messagesRepo.create(message);
  }
}
//   constructor() {
//     this.messagesRepo = new MessagesRepository();
// Service is creating its own dependency
// Dont do this on real projects
// contructorda bu sınıfın mesaj repo görevinde olduğunu belirttik
// repository bir bağımlılıktır.
// service repoya bağlı olmadığı sürece düzgün çalışmaz
// burası gerçekten kullanılması gereken bir kod satırı değildir.
//   }
