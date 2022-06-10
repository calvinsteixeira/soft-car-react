import { keyframes } from "@mui/system";
import Alert from "@mui/material/Alert";

const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export default function ErrorAlert({ alertText }) {
  return (
    <Alert
      sx={{
        alignItems: "center",
        animation: `${blink}`,
        animationDuration: "0.5s",
        color: "#ef5151",
        backgroundColor: "transparent",
      }}
      severity="error"
    >
      {alertText}
    </Alert>
  );
}
