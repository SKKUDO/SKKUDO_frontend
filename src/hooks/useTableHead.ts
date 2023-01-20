import { ClubType } from "./../types/club";
import { useParams } from "react-router-dom";
import { getOneClub } from "./../utils/fetch/fetchClub";
import { useEffect, useState } from "react";

interface ITableHeadItem {
  id: string;
  label: string;
  alignRight: boolean;
}

const TABLE_HEAD: ITableHeadItem[] = [
  { id: "name", label: "이름", alignRight: false },
  { id: "studentId", label: "학번", alignRight: false },
  { id: "role", label: "역할", alignRight: false },
  { id: "major", label: "학과", alignRight: false },
  { id: "location", label: "위치", alignRight: false },
];

const MANAGE_TABLE_HEAD: ITableHeadItem[] = [
  { id: "name", label: "이름", alignRight: false },
  { id: "studentId", label: "학번", alignRight: false },
  { id: "role", label: "역할", alignRight: false },
  { id: "major", label: "학과", alignRight: false },
  { id: "location", label: "위치", alignRight: false },
  { id: "contact", label: "연락처", alignRight: false },
];

export default function useTableHead(isManage: boolean) {
  const { clubID } = useParams();
  const [tableHead, setTableHead] = useState<ITableHeadItem[]>(
    isManage ? MANAGE_TABLE_HEAD : TABLE_HEAD
  );

  useEffect(() => {
    getOneClub(clubID || "")
      .then((club: ClubType) => {
        const userColumns: ITableHeadItem[] = club.userColumns.map((item) => {
          const elem: ITableHeadItem = {
            id: item.key,
            label: item.key,
            alignRight: false,
          };
          return elem;
        });
        setTableHead([...tableHead, ...userColumns]);
      })
      .catch((error) => alert(error.error));
  }, []);

  return tableHead;
}
