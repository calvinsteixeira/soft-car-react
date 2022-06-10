import { keyframes } from "@mui/system";
import Alert from "@mui/material/Alert";

const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export default function SuccessAlert({ alertText }) {
  return (
    <Alert
      sx={{
        animation: `${blink}`,
        alignItems: "center",
        animationDuration: "0.5s",
        color: "#31b641",
        backgroundColor: "transparent",
      }}
      severity="success"
    >
      {alertText}
    </Alert>
  );
}
