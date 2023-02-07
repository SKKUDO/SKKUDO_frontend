import axios from "axios";
import { NewNoticeTagType } from "../../types/notice";
import { DeleteTodoType, NewToDoType, UpdateTodoType } from "../../types/todo";
import { BASE_URL } from "./fetch";

const GET_ALL_TODOS_URL = `${BASE_URL}/todos/ToDos`;

export const getAllTodos = async () =>
  axios.get(GET_ALL_TODOS_URL).then((res) => res.data.data);

export const getTodosByClubID = async (clubID: string) =>
  axios
    .get(GET_ALL_TODOS_URL.concat("/club/", clubID))
    .then((res) => res.data.data);

export const createTodo = async (newTodo: NewToDoType) =>
  axios.post(GET_ALL_TODOS_URL, newTodo).then((res) => res.data.data);

export const deleteTodo = async (deleteTodoInfo: DeleteTodoType) =>
  axios
    .delete(GET_ALL_TODOS_URL.concat("/", deleteTodoInfo._id), {
      data: { clubId: deleteTodoInfo.clubId },
    })
    .then((res) => res.data);

export const updateTodo = async (todoInfo: UpdateTodoType) =>
  axios
    .patch(GET_ALL_TODOS_URL.concat("/", todoInfo._id), todoInfo)
    .then((res) => res.data);

const GET_ALL_TODO_TAGS_URL = `${BASE_URL}/todos/toDoTags`;

export const getTodoTagsByClubID = async (clubID: string) =>
  axios
    .get(GET_ALL_TODO_TAGS_URL.concat("/club/", clubID))
    .then((res) => res.data.data);

export const createTodoTag = async (newTag: NewNoticeTagType) =>
  axios.post(GET_ALL_TODO_TAGS_URL, newTag).then((res) => res.data);

export const deleteTodoTag = async (tagInfo: DeleteTodoType) =>
  axios
    .delete(GET_ALL_TODO_TAGS_URL.concat("/", tagInfo._id), {
      data: {
        clubId: tagInfo.clubId,
      },
    })
    .then((res) => res.data);
