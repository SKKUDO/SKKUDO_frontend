import { useState } from "react";

import { Dialog, Button, ButtonGroup, styled } from "@mui/material";
import ColumnCreate from "./ColumnCreate";
import ColumnUpdate from "./ColumnUpdate";
import ColumnDelete from "./ColumnDelete";

interface ColumnModalType {
  addColumnModalOpen: boolean;
  setColumnModalOpen: (arg: boolean) => void;
}

interface SwitchPageType {
  create: boolean;
  update: boolean;
  delete: boolean;
}

const MainWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "400px",
  height: "200px",
  margin: "0 auto",
});

const ButtonWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px",
});

const CloseWrapper = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

const ModalTitle = styled("h1")({
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center",
  color: "#000069",
  marginTop: "5px",
  width: "512px",
});

const ModalDescription = styled("p")({
  fontSize: "15px",
  textAlign: "center",
  color: "#000069",
  marginTop: "5px",
});

export default function ColumnModal({
  addColumnModalOpen,
  setColumnModalOpen,
}: ColumnModalType) {
  const [switchPage, setSwitchPage] = useState<SwitchPageType>({
    create: true,
    update: false,
    delete: false,
  });

  return (
    <Dialog
      open={addColumnModalOpen}
      onClose={() => setColumnModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalTitle>이곳에서 유저의 열을 편집하세요</ModalTitle>
      <ModalDescription>
        유저의 열을 편집하는 작업은 동아리 전체에 영향을 줄 수 있습니다.
      </ModalDescription>
      <ModalDescription>신중하게 판단해주세요.</ModalDescription>
      <ButtonWrapper>
        <ButtonGroup
          variant="text"
          color="success"
          aria-label="text button group"
        >
          <Button
            variant={switchPage.create ? "contained" : undefined}
            onClick={() =>
              setSwitchPage({ create: true, update: false, delete: false })
            }
          >
            열 생성
          </Button>
          <Button
            variant={switchPage.update ? "contained" : undefined}
            onClick={() =>
              setSwitchPage({ create: false, update: true, delete: false })
            }
          >
            열 수정
          </Button>
          <Button
            variant={switchPage.delete ? "contained" : undefined}
            onClick={() =>
              setSwitchPage({ create: false, update: false, delete: true })
            }
          >
            열 삭제
          </Button>
        </ButtonGroup>
      </ButtonWrapper>

      <MainWrapper>
        {switchPage.create ? <ColumnCreate /> : <></>}
        {switchPage.update ? <ColumnUpdate /> : <></>}
        {switchPage.delete ? <ColumnDelete /> : <></>}
      </MainWrapper>
      <CloseWrapper>
        <Button color="success" onClick={() => setColumnModalOpen(false)}>
          CLOSE
        </Button>
      </CloseWrapper>
    </Dialog>
  );
}
