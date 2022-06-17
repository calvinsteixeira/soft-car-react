import { Button } from "@mui/material";

export function ButtonComponent({
  buttonContent,
  type,
  bgColor,
  borderColor,
  variant,
  textColor,
  href,
  marginTop,
  width,
  height,
  bgHover,
  bcHover,
}) {
  const styles = {
    "&.MuiButton-root": {
      boxShadow: "none",
      color: textColor,
      width: width,
      marginTop: marginTop,
      height: height,
      backgroundColor: bgColor,
      borderColor: borderColor,
      "&:hover": {
        transition: "0.5s",
        boxShadow: "none",
        backgroundColor: bgHover,
        borderColor: bcHover,
      },
    },
  };
  return (
    <Button href={href} type={type} sx={styles} variant={variant}>
      {buttonContent}
    </Button>
  );
}
