import styled from "styled-components";
import { ButtonComponent } from "../../components/Buttons/ButtonComponent";
import { TextInput } from "../../components/Inputs/TextInput";
import FileUpload from "react-material-file-upload";
import { useState } from "react";
import logo from "../../public/static/images/logo.svg";
const View = styled.div`
  background-color: #252422;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  height: auto;
`;
const Form = styled.form`
  @media (min-width: 480px) {
    width: 16rem;
  }

  display: flex;
  flex-direction: column;
  width: 14rem;
  gap: 0.8rem;
`;
const Logo = styled.img`
  width: 11rem;
  height: auto;
  margin-bottom: 2rem;
`;

function NewCarForm() {
  const [files, setFiles] = useState([]);

  return (
    <>
      <Form>
        <TextInput label={"Modelo do carro"} />
        <TextInput height={"9rem"} label={"Descrição"} />
        <FileUpload
          buttonProps={{
            sx: {
              backgroundColor: "#EB5E28",
              "&:hover": { backgroundColor: "#e17f59" },
            },
          }}
          title={""}
          buttonText={"ANEXAR IMAGENS"}
          sx={{
            color: "white;",
            borderColor: "#EB5E28",
            "&:hover": { borderColor: "#EB5E28" },
            "&:focus": { borderColor: "white" },
            ".MuiSvgIcon-root": {
              fill: "white",
            },
            ".MuiBox-root li div": {
              color: "white",
            },
          }}
          value={files}
          onChange={setFiles}
        />
        <ButtonComponent
          bgColor={"#EB5E28"}
          bgHover={"#e17f59"}
          variant={"contained"}
          height={"3rem"}
          type={"submit"}
          marginTop={"1rem"}
          buttonContent={"Adicionar carro"}
          width={"100%"}
        />
      </Form>
    </>
  );
}

export function NewCarView() {
  return (
    <View>
      <Logo src={logo} alt="logo" />
      <NewCarForm />
    </View>
  );
}