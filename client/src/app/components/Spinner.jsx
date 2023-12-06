import { Box, CircularProgress } from "@mui/material";

function Spinner({ size, containerStyles }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "50vh",
        justifyContent: "center",
        alignItems: "center",
        ...containerStyles,
      }}
    >
      <CircularProgress size={size || 80} />
    </Box>
  );
}

export { Spinner };
