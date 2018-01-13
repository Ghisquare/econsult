import {User} from "./user";
export class Message {
  id: number;
  content: string;
  authorId: number;
  author: User;
  toId: number;
  to: User;
  date: number;
  consultationId: number;
}
