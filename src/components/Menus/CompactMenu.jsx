import { useState } from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";

export function CompactMenu() {
  const [value, setValue] = useState();

  return (
    <Paper
      sx={{
        ["@media (min-width:480px)"]: {
          display: "none",
        },

        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: "#3b3b3b 0px 7px 30px",
      }}
      elevation={3}
    >
      <BottomNavigation
        sx={{
          backgroundColor: "#f7f7f7",

          ".Mui-selected": {
            color: "#EB5E28",
          },
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          sx={{
            "&.Mui-selected": {
              color: "#EB5E28",
            },
          }}
          label="Favoritos"
          icon={<StarIcon sx={{ fill: "#EB5E28" }} />}
        />
        <BottomNavigationAction
          sx={{
            "&.Mui-selected": {
              color: "#EB5E28",
            },
          }}
          label="Novo"
          icon={<AddIcon sx={{ fill: "#EB5E28" }} />}
        />
        <BottomNavigationAction
          sx={{
            "&.Mui-selected": {
              color: "#EB5E28",
            },
          }}
          label="Perfil"
          icon={
            <AccountCircleIcon
              sx={{
                fill: "#EB5E28",
              }}
            />
          }
        />
      </BottomNavigation>
    </Paper>
  );
}