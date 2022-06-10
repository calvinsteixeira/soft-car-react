import { useState } from "react";
import TextInput from "../Inputs/TextInput";
import ButtonComponent from "../Buttons/ButtonComponent";
import styled from "styled-components";
import axios from "axios";
import ErrorAlert from "../Alert/ErrorAlert";
import CircularProgress from "@mui/material/CircularProgress";

const Form = styled.form`
  @media (min-width: 480px) {
    width: 16rem;
  }
  display: flex;
  flex-direction: column;
  width: 14rem;
  gap: 1.8rem;
`;

export default function LoginForm() {
  const apiUrl = "https://authenticateapi.herokuapp.com";
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [alertText, setAlertText] = useState();
  const [buttonContent, setButtonContent] = useState("ENTRAR");

  return (
    <Form onSubmit={loginRequest}>
      <TextInput
        required={true}
        name={"username"}
        label={"Seu usuário"}
        variant={"outlined"}
        type={"text"}
        event={(e) => setUsername(e.target.value)}
      />
      <TextInput
        required={true}
        name={"password"}
        label={"Sua senha"}
        variant={"outlined"}
        type={"password"}
        event={(e) => setPassword(e.target.value)}
      />
      <ButtonComponent
        bgColor={"#EB5E28"}
        bgHover={"#e17f59"}
        variant={"contained"}
        height={"3rem"}
        type={"submit"}
        buttonContent={buttonContent}
        width={"100%"}
      />

      {alertText && <ErrorAlert alertText={alertText} />}
    </Form>
  );

  // METHODS
  function loginRequest(e) {
    e.preventDefault();

    setButtonContent(<CircularProgress size="2rem" sx={{ color: "white" }} />);
    axios
      .post(
        apiUrl + "/auth",
        { username: username, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setButtonContent("ENTRAR");
        if (res.data.hasError == false) {
        }
      })
      .catch((err) => {
        setButtonContent("ENTRAR");
        if (err.code == "ERR_NETWORK") {
          setAlertText("Falha na conexão com o servidor ao realizar o login");
        } else if (err.response.status == 401) {
          setAlertText("Usuário ou senha incorretos!");
        }
      });
  }
}
