import axios from "axios";
import { BASE_URL } from "./fetch";

const LOGIN_URL = `${BASE_URL}/auth/login`;

export const loginFromServer = async (userID: string, password: string) =>
  axios
    .post(LOGIN_URL, { userID, password }, { withCredentials: true })
    .then((res) => res.data.data);

const LOGOUT_URL = `${BASE_URL}/auth/logout`;

export const logoutFromServer = async () =>
  axios.post(LOGOUT_URL, {}).then((res) => res.data);

const VERIFY_URL = `${BASE_URL}/auth/verify`;

export const verifyUser = async () =>
  axios.post(VERIFY_URL, {}).then((res) => res.data.data);
