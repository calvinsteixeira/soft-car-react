import styled from "styled-components";
import { CarCard } from "../../components/DataShow/Card";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { CompactMenu } from "../../components/Menus/CompactMenu";
import { LargeMenu } from "../../components/Menus/LargeMenu";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { width } from "@mui/system";

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

    return (
      <View>
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
        <CompactMenu />
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
            right: "3rem",
            color: "white",
            display: "flex",
            gap: "0.2rem",
          }}
          size={"medium"}
          aria-label="add"
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
