import { Box, Typography } from "@mui/material";

function NoResults({ content }) {
  return (
    <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh"
    }}>
      <Typography variant="h3">{content}</Typography>
    </Box>
  );
}

export { NoResults };
