import {User} from "./user";
export class Message {
  id: number;
  content: string;
  authorId: number;
  author: any;
  toId: number;
  to: any;
  date: string;
  consultationId: number;
}
