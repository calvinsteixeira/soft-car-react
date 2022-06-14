import { useState } from "react";
import TextInput from "../Inputs/TextInput";
import ButtonComponent from "../Buttons/ButtonComponent";
import styled from "styled-components";
import axios from "axios";
import ErrorAlert from "../Alert/ErrorAlert";
import SuccessAlert from "../Alert/SuccessAlert";
import CircularProgress from "@mui/material/CircularProgress";
import InputMask from "react-input-mask";
import validateFields from "../../services/utils/validateFields";

const Form = styled.form`
  @media (min-width: 480px) {
    width: 16rem;
  }

  display: flex;
  flex-direction: column;
  width: 14rem;
  gap: 1.4rem;
`;

export default function RegisterForm() {
  const apiUrl = "https://authenticateapi.herokuapp.com";
  const [name, setName] = useState();
  const [cpf, setCpf] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorAlertText, setErrorAlertText] = useState();
  const [successAlertText, setSuccessAlertText] = useState();
  const [buttonContent, setButtonContent] = useState("CADASTRAR");
  const [fieldsErrors, setFieldsErrors] = useState({});

  return (
    <>
      <Form onSubmit={registerUser}>
        <TextInput
          inputError={fieldsErrors.name ? true : false}
          inputTextError={fieldsErrors.name}
          name={"name"}
          label={"Seu nome completo"}
          variant={"outlined"}
          type={"text"}
          event={(e) => setName(e.target.value)}
        />

        <InputMask
          mask="999.999.999-99"
          value={cpf}
          disabled={false}
          maskChar=""
        >
          {() => (
            <TextInput
              inputError={fieldsErrors.cpf ? true : false}
              inputTextError={fieldsErrors.cpf}
              name={"cpf"}
              label={"Seu CPF"}
              variant={"outlined"}
              event={(e) => {
                if (e.target.value.length > 14) {
                  e.target.value = e.target.value.substring(0, 14);
                }
                setCpf(e.target.value);
              }}
            />
          )}
        </InputMask>

        <TextInput
          inputError={fieldsErrors.username ? true : false}
          inputTextError={fieldsErrors.username}
          inputError={fieldsErrors.username ? true : false}
          inputTextError={fieldsErrors.username}
          name={"username"}
          label={"Seu usuário"}
          variant={"outlined"}
          type={"text"}
          event={(e) => setUsername(e.target.value)}
        />
        <TextInput
          inputError={fieldsErrors.password ? true : false}
          inputTextError={fieldsErrors.password}
          name={"password"}
          label={"Sua senha"}
          variant={"outlined"}
          type={"password"}
          event={(e) => setPassword(e.target.value)}
        />
        <ButtonComponent
          width={"100%"}
          height={"3rem"}
          marginTop={"1rem"}
          bgColor={"#EB5E28"}
          bgHover={"#e17f59"}
          variant={"contained"}
          type={"submit"}
          buttonContent={buttonContent}
        />
        <ButtonComponent
          width={"100%"}
          height={"3rem"}
          href={"/"}
          borderColor={"#EB5E28"}
          bcHover={"#e17f59"}
          textColor={"white"}
          bgColor={"transparent"}
          bgHover={"transparent"}
          variant={"outlined"}
          type={"default"}
          buttonContent={"VOLTAR AO LOGIN"}
        />
      </Form>

      <div
        style={{
          position: "absolute",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          bottom: "1rem",
          left: 0,
          right: 0,
        }}
      >
        {errorAlertText && <ErrorAlert alertText={errorAlertText} />}
        {successAlertText && <SuccessAlert alertText={successAlertText} />}
      </div>
    </>
  );

  function registerUser(e) {
    e.preventDefault();

    const fields = {
      name: name,
      CPF: cpf,
      username: username,
      password: password,
    };

    const errors = validateFields(fields);
    if (Object.keys(errors).length == 0) {
      setFieldsErrors({});
      JSON.stringify(fields);
      setButtonContent(
        <CircularProgress size="2rem" sx={{ color: "white" }} />
      );
      setTimeout(() => {
        axios
          .post(apiUrl + "/register-user", fields, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setButtonContent("CADASTRAR");
            if (res.status == 200 && res.data.hasError == false) {
              setSuccessAlertText("Cadastro realizado com sucesso!");
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
          })
          .catch((err) => {
            setButtonContent("CADASTRAR");
            if (err.code == "ERR_NETWORK") {
              setErrorAlertText(
                "Falha na conexão com o servidor ao realizar o cadastro"
              );
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            } else if (err.response.status == 409) {
              setErrorAlertText("O CPF informado já possui cadastro");
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
          });
      }, 2000);
    } else {
      setFieldsErrors(errors);
    }
  }
}
