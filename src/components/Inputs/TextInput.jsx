import { TextField } from "@mui/material";
import colors from "../../public/css/colors";

export function TextInput({
  label,
  variant,
  type,
  name,
  event,
  required,
  width,
  height,
  inputError,
  inputTextError,
  endAdornment,
  multiline,
  rows,
  labelColor,
}) {
  return (
    <TextField
      required={required}
      sx={{
        "& label.Mui-focused": {
          color: colors.textPrimary,
        },
        input: {
          height: height,
          width: width,
          color: colors.textPrimary,
          ":-webkit-autofill, :-webkit-autofill:hover, :-webkit-autofill:focus, :-webkit-autofill:active":
            {
              boxShadow: "0 0 0 30px #532b1b inset !important",
            },
          ":-webkit-autofill": {
            textFillColor: "white !important",
          },
        },
        label: {
          color: labelColor || colors.textPrimary,
        },

        "& .MuiOutlinedInput-root": {
          "& textarea": {
            color: colors.textPrimary,
          },
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
      multiline={multiline}
      rows={rows}
      InputProps={{ endAdornment: endAdornment }}
      error={inputError}
      helperText={inputTextError}
      name={name}
      label={label}
      variant={variant}
      type={type}
      onChange={event}
    />
  );
}
