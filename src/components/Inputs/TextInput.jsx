import { TextField } from "@mui/material";
import colors from "../../public/css/colors";

export default function TextInput({
  label,
  variant,
  type,
  name,
  event,
  required,
  width,
}) {
  return (
    <TextField
      required={required}
      sx={{
        "& label.Mui-focused": {
          color: colors.textPrimary,
        },
        input: {
          width: width,
          color: colors.textPrimary,
        },
        label: {
          color: colors.textPrimary,
        },

        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: colors.primaryColor,
          },
          "&:hover fieldset": {
            borderColor: colors.primaryColor,
          },
          "&.Mui-focused fieldset": {
            borderColor: colors.primaryColor,
          },
        },
      }}
      name={name}
      label={label}
      variant={variant}
      type={type}
      onChange={event}
    />
  );
}
