import axios from "axios";
import { RoleType } from "../../types/common";
import { NewUserType, RegisterInfoType } from "../../types/user";
import { BASE_URL } from "./fetch";

const GET_ONE_USER_URL = `${BASE_URL}/users/`;

export const getAllUsers = async () =>
  axios.get(GET_ONE_USER_URL).then((res) => res.data.data);

export const deleteUser = async (userID: string) =>
  axios.delete(GET_ONE_USER_URL.concat(userID)).then((res) => res.data);

export const getOneUser = async (userID: string) =>
  axios.get(GET_ONE_USER_URL.concat(userID)).then((res) => res.data.data);

export const updateUserColumn = async (
  clubID: string,
  newColumnInfo: { key: string; value: string }
) =>
  axios
    .patch(GET_ONE_USER_URL.concat("club/moreColumn/", clubID), newColumnInfo)
    .then((res) => res.data)
    .catch((error) => {
      return error;
    });

export const updateUser = async (userID: string, contact: string) =>
  axios
    .patch(GET_ONE_USER_URL.concat(userID), { contact })
    .then((res) => res.data);

const GET_CLUB_MEMBERS_URL = `${BASE_URL}/users/byClub/`;

export const getClubMembers = async (clubID: string) =>
  axios.get(GET_CLUB_MEMBERS_URL.concat(clubID)).then((res) => res.data.data);

const CREATE_USER_URL = `${BASE_URL}/users`;

export const createUser = async (userInfo: NewUserType) =>
  axios.post(CREATE_USER_URL, userInfo).then((res) => res.data);

export const REGISTER_CLUB_URL = `${BASE_URL}/users/club/register/`;

export const registerClub = async (
  userID: string,
  clubID: string,
  registerInfo: RegisterInfoType
) =>
  await axios
    .patch(REGISTER_CLUB_URL.concat(userID, "/", clubID), registerInfo)
    .then((res) => res.data);

export const deregisterClub = async (userID: string, clubID: string) =>
  axios
    .patch(CREATE_USER_URL.concat("/club/deregister/", userID, "/", clubID), {})
    .then((res) => res.data);

export const deregisterClubOneSelf = async (userID: string, clubID: string) =>
  axios
    .patch(
      CREATE_USER_URL.concat("/club/deregister/self/", userID, "/", clubID),
      {}
    )
    .then((res) => res.data);

export const deregisterClubByAdmin = async (userID: string, clubID: string) =>
  axios
    .patch(
      CREATE_USER_URL.concat("/club/deregister/admin/", userID, "/", clubID)
    )
    .then((res) => res.data);

export const UPDATE_ROLE_URL = `${BASE_URL}/users/club/role`;

export const updateRole = async (
  clubId: string,
  userID: string,
  updatingRole: RoleType
) => {
  const result = await axios.patch(
    UPDATE_ROLE_URL.concat(`/${userID}/${clubId}`),
    {
      updatingRole,
    }
  );
  return result;
};

export const registerPassedUsers = () =>
  axios.patch(REGISTER_CLUB_URL.concat("/many/")).then((res) => res.data);
