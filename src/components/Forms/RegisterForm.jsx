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
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const Form = styled.form`
  @media (min-width: 480px) {
    width: 16rem;
  }

  display: flex;
  flex-direction: column;
  width: 14rem;
  gap: 0.8rem;
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
  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

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
          type={showPassword ? "text" : "password"}
          event={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Alterar a visibilidade do campo senha"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword == false ? (
                  <VisibilityOff
                    sx={{
                      fill: "white",
                      marginRight: "0.3rem",
                    }}
                  />
                ) : (
                  <Visibility
                    sx={{
                      fill: "white",

                      marginRight: "0.3rem",
                    }}
                  />
                )}
              </IconButton>
            </InputAdornment>
          }
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
          marginTop: "1rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
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
      cpf: cpf,
      username: username,
      password: password,
    };

    const errors = validateFields(fields);
    if (Object.keys(errors).length == 0) {
      setFieldsErrors({});
      fields.cpf = cpf.replace(/[.-]/g, "");
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
              setErrorAlertText("");
            }
          })
          .catch((err) => {
            setButtonContent("CADASTRAR");
            if (err.code == "ERR_NETWORK") {
              setSuccessAlertText("");
              setErrorAlertText("Falha na conexão, por favor tente mais tarde");
            } else if (err.response.status == 409) {
              setSuccessAlertText("");
              setErrorAlertText("O CPF informado já possui cadastro");
            }
          });
      }, 2000);
    } else {
      setFieldsErrors(errors);
    }
  }
}
