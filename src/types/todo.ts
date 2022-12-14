import { UserType } from "./user";

export interface ToDoTagType {
  _id: string;
  clubId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ToDoType {
  _id: string;
  clubId: string;
  writer: UserType;
  title: string;
  private: boolean;
  content: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  attendingUsers: string[]; //유저들의 studentId의 배열
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewToDoType {
  clubId: string;
  title: string;
  private: boolean;
  content: string;
  date: string;
  startTime: string;
  endTime: string;
  attendingUsers: string[];
  tags: string[];
}

export interface UpdateTodoType extends NewToDoType {
  _id: string;
}

export interface DeleteTodoType {
  clubId: string;
  _id: string;
}
