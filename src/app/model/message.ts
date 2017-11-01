import {User} from "./user";
export class Message {
  id: number;
  content: string;
  author_id: number;
  author: User;
  to_id: number;
  to: User;
  date: number;
  consultation_id: number;
}
