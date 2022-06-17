import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ButtonComponent } from "../Buttons/ButtonComponent";
import Typography from "@mui/material/Typography";

export function CarCard({ model, description, img, price }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        maxHeight: "36rem",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image="https://picsum.photos/200/300"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {model}
        </Typography>
        <Typography
          sx={{ color: "green" }}
          gutterBottom
          variant="h7"
          component="div"
        >
          R$ {price}/dia
        </Typography>
        <Typography variant="body2" color="#252422">
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          ["@media (max-width:425px)"]: {
            flexDirection: "column",
            alignItems: "end",
          },
          display: "flex",
          gap: "0.3rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonComponent
          width={"100%"}
          bgColor={"#EB5E28"}
          bgHover={"#e17f59"}
          buttonContent={"CURTIR"}
          variant={"contained"}
        />
        <ButtonComponent
          width={"100%"}
          textColor={"#EB5E28"}
          borderColor={"#EB5E28"}
          bcHover={"#e17f59"}
          bgColor={"transparent"}
          bgHover={"transparent"}
          buttonContent={"VER MAIS"}
          variant={"outlined"}
        />
      </CardActions>
    </Card>
  );
}
