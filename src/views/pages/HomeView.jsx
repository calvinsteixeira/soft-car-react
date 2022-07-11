import { CarCard } from "../../components/DataShow/Card";
import axios from "axios";
import { CompactMenu } from "../../components/Menus/CompactMenu";
import { LargeMenu } from "../../components/Menus/LargeMenu";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import { ButtonComponent } from "../../components/Buttons/ButtonComponent";
import { TextInput } from "../../components/Inputs/TextInput";
import { MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { Select } from "@mui/material";
import colors from "../../public/css/colors";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Form = styled.form`
  @media (min-width: 480px) {
    width: 16rem;
  }

  display: flex;
  flex-direction: column;
  width: 14rem;
  gap: 0.8rem;
`;

const View = styled.div`
  background-color: #252422;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 4rem 5rem 4rem;
  @media only screen and (min-width: 481px) {
    padding: 5rem 4rem;
  }
  width: 100vw;
  min-height: 100vh;
  height: auto;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;

  grid-template-columns: repeat(auto-fit, minmax(18rem, 20rem));
  gap: 3rem;
`;

export function HomeView() {
  const apiUrl = "https://authenticateapi.herokuapp.com";
  const [cars, setCars] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadFilesText, setUploadFilesText] = useState("Anexar imagens");
  const [selectedYear, setSelectedYear] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [years, setYears] = useState([]);
  const isLogged = sessionStorage.getItem("isLogged");

  if (isLogged) {
    useEffect(() => {
      axios
        .get(
          apiUrl + "/get-cars",
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => setCars(res.data.cars))
        .catch((err) => console.log(err.response));
    }, []);

    useEffect(() => {
      getYears();
    }, [showDialog]);

    function getYears() {
      let availableYears = [];
      for (let i = 1940; i < 2022; i++) {
        availableYears.push(i);
      }

      setYears(availableYears);
    }

    function handleClose(e) {
      setShowDialog(false);
    }

    return (
      <View>
        <Dialog open={showDialog} onClose={handleClose}>
          <DialogTitle sx={{ textAlign: "center", background: "#f7f7f7" }}>
            Adicionar novo carro
          </DialogTitle>
          <DialogContent sx={{ background: "#f7f7f7" }}>
            <Form>
              <TextInput labelColor={"#EB5E28"} label={"Digite o modelo"} />
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    "&.Mui-focused": { color: "#EB5E28" },
                    color: "#EB5E28",
                  }}
                  id="select-year-label"
                >
                  Selecione o ano
                </InputLabel>
                <Select
                  sx={{
                    "&:hover, &.Mui-focused": {
                      "&& fieldset": {
                        border: `1px solid ${colors.primaryColor}`,
                      },
                    },
                    color: "#EB5E28",
                    fieldset: {
                      borderColor: colors.primaryColor,
                    },
                    svg: {
                      fill: colors.primaryColor,
                    },
                  }}
                  MenuProps={{ sx: { maxHeight: "15rem" } }}
                  labelId="select-year-label"
                  value={selectedYear}
                  defaultValue=""
                  label="Selecione o ano"
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                  }}
                >
                  <MenuItem value={""}>Vazio</MenuItem>
                  {years.map((year, i) => {
                    return (
                      <MenuItem key={i} value={year}>
                        {year}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextInput
                labelColor={"#EB5E28"}
                multiline={true}
                rows={4}
                height={"9rem"}
                label={"Digite uma descrição"}
              />
              <div
                style={{
                  padding: "1rem",
                  border: `1px solid ${"#EB5E28"}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <label
                  style={{
                    cursor: "pointer",
                    fontWeight: "500",
                    color: "white",
                    width: "100%",
                    backgroundColor: "#5c5c5c",
                    padding: "0.4rem",
                    textAlign: "center",
                    borderRadius: "0.25rem",
                  }}
                  htmlFor="files"
                >
                  {uploadFilesText}
                </label>
                <div
                  style={{
                    display: selectedFiles.length > 0 ? "flex" : "none",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                  id="file-container"
                >
                  {selectedFiles.map((file, index) => (
                    <p
                      style={{
                        fontWeight: "500",
                        border: "1px solid #EB5E28",
                        borderRadius: "0.4rem",
                        padding: "0.2rem 0.4rem",
                        width: "max-content",
                        display: "inline-flex",
                        gap: "0.3rem",
                      }}
                      key={index}
                    >
                      {file.name}
                      <span
                        onClick={() => {
                          if (selectedFiles.length == 1) {
                            setUploadFilesText("Anexar imagens");
                          }
                          setSelectedFiles([
                            ...selectedFiles.filter(
                              (selectedFile) => selectedFile != file
                            ),
                          ]);
                        }}
                        style={{
                          color: "#EB5E28",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        x
                      </span>
                    </p>
                  ))}
                </div>
                <input
                  id="files"
                  style={{ display: "none", color: "white" }}
                  accept=".jpg, .png"
                  multiple
                  type="file"
                  onChange={(e) => {
                    const files = [];
                    for (let file of e.target.files) {
                      files.push(file);
                    }
                    setSelectedFiles(files);
                    setUploadFilesText("Anexar mais imagens");
                  }}
                />
              </div>
            </Form>
          </DialogContent>
          <DialogActions sx={{ background: "#f7f7f7" }}>
            <ButtonComponent
              width={"100%"}
              bgColor={"#EB5E28"}
              bgHover={"#e17f59"}
              variant={"contained"}
              event={(e) => handleClose(e)}
              buttonContent={"ADICIONAR"}
            />
            <ButtonComponent
              width={"100%"}
              textColor={"#EB5E28"}
              borderColor={"#EB5E28"}
              bcHover={"#e17f59"}
              bgColor={"transparent"}
              bgHover={"transparent"}
              variant={"outlined"}
              event={handleClose}
              buttonContent={"CANCELAR"}
            />
          </DialogActions>
        </Dialog>
        <CardsContainer>
          {cars.map((car) => {
            return (
              <CarCard
                key={car.id}
                model={car.modelo}
                description={car.descricao}
                price={car.preco}
              />
            );
          })}
        </CardsContainer>
        <CompactMenu
          newCarEvent={() => {
            setShowDialog(true);
          }}
          logoutEvent={() => {
            sessionStorage.removeItem("isLogged");
            window.location.href = "/";
          }}
        />
        <LargeMenu />
        <Fab
          variant="extended"
          sx={{
            ["@media (max-width: 480px)"]: {
              display: "none",
            },
            backgroundColor: "#EB5E28 !important",
            svg: {
              fill: "white",
            },
            position: "fixed",
            bottom: "1.5rem",
            ["@media (max-width:815px)"]: {
              right: "1rem",
            },
            right: "3rem",
            color: "white",
            display: "flex",
            gap: "0.2rem",
          }}
          size={"medium"}
          aria-label="add"
          onClick={() => {
            setShowDialog(true);
          }}
        >
          <AddIcon />
          Novo Carro
        </Fab>
      </View>
    );
  } else {
    window.location.href = "/";
  }
}
