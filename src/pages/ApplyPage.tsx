import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../atoms/loginAtom";
import { loggedInUserState } from "../atoms/userAtom";
import FormTitle from "../components/FormTitle";
import { ApplierType, ApplyFormType } from "../types/apply";
import { ColumnType } from "../types/common";

import {
  createAppliedUser,
  getApplierByClubID,
} from "../utils/fetch/fetchApply";

const ApplyWrapper = styled("div")({
  paddingTop: "180px",
  paddingBottom: "100px",
});

const ApplyClubPageContainer = styled("form")({
  paddingTop: "50px",
  width: "100%",
  maxWidth: "70%",
  backgroundColor: "#fff",
  borderRadius: "3px",
  margin: "0 auto",
  paddingBottom: "70px",
  position: "relative",
  boxShadow: "5px 5px 5px rgba(0,0,0,0.5)",
});

const ApplyInputContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "40px",
  gap: "40px",
  marginBottom: "70px",
  marginTop: "40px",
});

const InputCell = styled("div")({});
const InputTitle = styled("div")({
  marginBottom: "20px",
  color: "#000069",
});

type answerType = Map<number, string>;
type subAnswerType = Map<string, string>;

function ApplyPage() {
  const { clubID } = useParams();
  const { state } = useLocation();
  const applierInfo = useRecoilValue(loggedInUserState);
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  // if(!isLoggedIn) {

  // }

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 후 이용하실 수 있는 서비스 입니다");
      // navigate("/login");
    }
  }, []);

  const { data, isLoading } = useQuery<ApplierType>(
    "getApplierByClubID",
    () => getApplierByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const { mutate } = useMutation(
    (applierInfo: ApplyFormType) => createAppliedUser(applierInfo),
    {
      onSuccess: (data) => {
        alert("동아리에 지원서가 접수되었습니다!");
        navigate("/");
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const [answers, setAnswers] = useState<answerType>(new Map());
  const [subAnswers, setSubAnswers] = useState<subAnswerType>(new Map());

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => {
    setAnswers(new Map(answers.set(idx, event.target.value)));
  };

  const handleSubInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setSubAnswers(new Map(subAnswers.set(key, event.target.value)));
  };

  const handleApplySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tempMoreColumns: {
      column: ColumnType;
      value: String;
    }[] = [];
    if (data) {
      data.appliedUserColumns.forEach((col) =>
        tempMoreColumns.push({
          column: col,
          value: subAnswers.get(col._id) || "",
        })
      );
    }

    // console.log(tempMoreColumns);
    if (data && applierInfo) {
      const tempApplyInfo: ApplyFormType = {
        clubId: clubID || "",
        userID: applierInfo.userID,
        studentId: applierInfo.studentId,
        name: applierInfo.name,
        major: applierInfo.major,
        contact: applierInfo.contact,
        moreColumns: tempMoreColumns,
        documentAnswers: Array.from(answers.values()),
        documentScores: Array.from(
          { length: data.documentQuestions.length },
          () => 0
        ),
        interviewScores: Array.from(
          { length: data.interviewQuestions.length },
          () => 0
        ),
        clubName: state,
      };
      // console.log(tempApplyInfo);
      mutate(tempApplyInfo);
    }
  };

  return (
    <ApplyWrapper>
      <ApplyClubPageContainer onSubmit={handleApplySubmit}>
        <FormTitle title="동아리 지원서" />
        <ApplyInputContainer>
          {!data ? (
            <div>아직 지원을 받고 있지 않는 동아리입니다</div>
          ) : (
            data?.documentQuestions.map((question, index) => (
              <InputCell key={question}>
                <InputTitle>{question}</InputTitle>
                <TextField
                  required
                  sx={{ width: "100%", input: { backgroundColor: "#fff" } }}
                  label="답변을 작성하세요"
                  variant="outlined"
                  multiline
                  rows={5}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </InputCell>
            ))
          )}
          {isLoading ? (
            <></>
          ) : (
            data?.appliedUserColumns.map((column) => (
              <InputCell key={column._id}>
                <InputTitle>{column.key}</InputTitle>
                <TextField
                  required
                  sx={{ width: "100%", input: { backgroundColor: "#fff" } }}
                  label="답변을 작성하세요"
                  variant="outlined"
                  multiline
                  rows={1}
                  onChange={(event) => handleSubInputChange(event, column._id)}
                />
              </InputCell>
            ))
          )}
        </ApplyInputContainer>

        <Button
          sx={{ position: "absolute", right: "20px" }}
          // onClick={handleApplySubmit}
          type="submit"
          variant="outlined"
          color="success"
        >
          제출
        </Button>
      </ApplyClubPageContainer>
    </ApplyWrapper>
  );
}

export default ApplyPage;
