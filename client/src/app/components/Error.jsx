import { Box, Typography } from "@mui/material";

function Error({message}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Typography variant="h3" sx={{textAlign: "center"}}>
        {message || "An error occurred, please try again later!" }
      </Typography>
    </Box>
  );
}

export { Error };
