import { ClubType } from "./../types/club";
import { atom } from "recoil";
import { ApplierType } from "../types/apply";

export const isNoticeDetailOpenState = atom({
  key: "isNoticeDetailOpenState",
  default: false,
});

export const currentClubInfoState = atom<ClubType | null>({
  key: "currentClubInfo",
  default: null,
});

export const applierState = atom<ApplierType | null>({
  key: "applierState",
  default: null,
});
