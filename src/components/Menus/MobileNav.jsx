import { useState } from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";

export function MobileNav() {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{
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
          label="Recents"
          icon={
            <RestoreIcon
              sx={{
                fill: "#EB5E28",
              }}
            />
          }
        />
        <BottomNavigationAction
          sx={{
            "&.Mui-selected": {
              color: "#EB5E28",
            },
          }}
          label="Favorites"
          icon={<FavoriteIcon sx={{ fill: "#EB5E28" }} />}
        />
        <BottomNavigationAction
          sx={{
            "&.Mui-selected": {
              color: "#EB5E28",
            },
          }}
          label="Archive"
          icon={<ArchiveIcon sx={{ fill: "#EB5E28" }} />}
        />
      </BottomNavigation>
    </Paper>
  );
}
