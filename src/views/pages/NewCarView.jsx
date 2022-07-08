import styled from "styled-components";
import { ButtonComponent } from "../../components/Buttons/ButtonComponent";
import { TextInput } from "../../components/Inputs/TextInput";
import { MenuItem } from "@mui/material";
import logo from "../../public/static/images/logo.svg";
import { useState, useEffect } from "react";
import { Select } from "@mui/material";

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
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState();
  const availableYears = [];

  useEffect(() => {
    for (let i = 1940; i <= 2022; i++) {
      availableYears.push(i);
    }
    setYears(availableYears);
  }, []);

  return (
    <>
      <Form>
        <TextInput label={"Digite o modelo"} />
        <Select
          label={"Selecione o ano"}
          defaultValue={""}
          onChange={(e) => {
            setSelectedYear(e.target.value);
          }}
        >
          {years.map((year, i) => {
            return (
              <MenuItem key={i} value={year}>
                {year}
              </MenuItem>
            );
          })}
        </Select>
        <TextInput
          multiline={true}
          rows={4}
          height={"9rem"}
          label={"Digite uma descrição"}
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
