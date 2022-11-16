import { motion } from "framer-motion";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import styled from "styled-components";
import { isLoggedInState } from "../atoms/loginAtom";

import { loginFromServer } from "../utils/fetch";

const LoginPageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoginCard = styled.div`
  background-color: #0c4426;
  width: 600px;
  height: 300px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5);
  align-items: center;
`;

const Title = styled.div`
  font-size: 70px;
  margin-top: 20px;
  color: #dde143;
`;

const LoginForm = styled.form`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoginInput = styled.input`
  height: 30px;
  width: 250px;
  font-size: 20px;
`;

const LoginButton = styled(motion.button)`
  width: 60px;
  color: #dde143;
  background-color: transparent;
  border: 2px solid #dde143;
  border-radius: 5px;
  font-weight: 800;
  font-size: 30px;
`;

function LoginPage() {
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  if (isLoggedIn) {
    navigate("/");
  }

  const { mutate } = useMutation(() => loginFromServer(ID, PW), {
    //need to fix
    onSuccess: (data) => {
      // console.log(data);
      setIsLoggedIn(true);
      navigate("/");
      window.location.reload();
    },
    onError: (error: { response: { data: { error: string } } }) =>
      alert(error.response.data.error),
  });

  const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setID(event.target.value);
  };

  const handlePWChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPW(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate();
  };

  return (
    <LoginPageContainer>
      <LoginCard>
        <Title>SKKUDO</Title>
        <LoginForm onSubmit={handleSubmit}>
          <LoginInputContainer>
            <LoginInput onChange={handleIDChange}></LoginInput>
            <LoginInput type="password" onChange={handlePWChange}></LoginInput>
          </LoginInputContainer>
          <LoginButton
            type="submit"
            whileHover={{ backgroundColor: "#dde143", color: "#FFFFFF" }}
          >
            Log In
          </LoginButton>
        </LoginForm>
      </LoginCard>
    </LoginPageContainer>
  );
}

export default LoginPage;
