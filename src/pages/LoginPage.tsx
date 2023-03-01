import { motion } from "framer-motion";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedInState } from "../atoms/loginAtom";
import { loggedInUserState } from "../atoms/userAtom";
import { UserType } from "../types/user";
import { loginFromServer } from "../utils/fetch/fetchAuth";

const LoginPageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoginCard = styled.div`
  background-color: #000069;
  width: 33vw;
  height: 35vh;
  border-radius: 1vw;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5);
  align-items: center;
  @media screen and (max-width: 1400px) {
    width: 50vw;
    height: 35vh;
  }
  @media screen and (max-width: 768px) {
    width: 80vw;
    height: 35vh;
  }
`;

const Title = styled.div`
  font-size: 3.3em;
  margin-top: 4.7vh;
  color: #e0e7e9;
  font-family: "Poppins", sans-serif;
`;

const LoginForm = styled.form`
  display: flex;
  gap: 1.3vw;
  margin-top: 2.5vh;
`;

const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;

const LoginInput = styled.input`
  height: 4vh;
  width: 13vw;
  font-size: 1.5em;
  @media screen and (max-width: 1400px) {
    width: 25vw;
    font-size: 1em;
  }
  @media screen and (max-width: 768px) {
    width: 45vw;
  }
`;

const LoginButton = styled(motion.button)`
  width: 10vw;
  cursor: pointer;
  color: #e0e7e9;
  background-color: transparent;
  border: 2px solid #e0e7e9;
  border-radius: 1vw;
  font-weight: 600;
  font-size: 1.7em;
  font-family: "Poppins", sans-serif;
  @media screen and (max-width: 1400px) {
    width: 13vw;
  }
  @media screen and (max-width: 768px) {
    width: 20vw;
  }

  @media screen and (max-width: 320px) {
    font-size: 1.3em;
  }

  &:hover {
    background-color: #e0e7e9;
    color: #000069;
  }
`;

function LoginPage() {
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");

  const setLoggedInUser = useSetRecoilState(loggedInUserState);

  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const { mutate } = useMutation(() => loginFromServer(ID, PW), {
    //need to fix
    onSuccess: (data: UserType) => {
      console.log(data);
      setLoggedInUser(data);
      setIsLoggedIn(true);
      navigate("/");
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
            <LoginInput
              required
              minLength={5}
              placeholder="ID"
              onChange={handleIDChange}
            ></LoginInput>
            <LoginInput
              required
              minLength={5}
              type="password"
              placeholder="Password"
              onChange={handlePWChange}
            ></LoginInput>
          </LoginInputContainer>
          <LoginButton
            type="submit"
            // whileHover={{ backgroundColor: "#dde143", color: "#0c4426" }}
          >
            Login
          </LoginButton>
        </LoginForm>
      </LoginCard>
    </LoginPageContainer>
  );
}

export default LoginPage;
