import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({
  progress = "0.75",
  size = "40",
  progressColor, // New prop
  backgroundColor, // New prop
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;

  // Use props if provided, otherwise fall back to theme colors
  const finalProgressColor = progressColor || colors.blueAccent[500];
  const finalBackgroundColor = backgroundColor || colors.greenAccent[500];

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${finalProgressColor} ${angle}deg 360deg),
            ${finalBackgroundColor}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;