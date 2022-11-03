import { atom } from "recoil";

export const userIDState = atom({
  key: "userIDState",
  default: "",
});

export const userNameState = atom({
  key: "userNameState",
  default: "",
});
