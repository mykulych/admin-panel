import { Box, Typography } from "@mui/material";

function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "76px",
        bgcolor: "#1A232E",
        mb: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3" sx={{ color: "#fff" }}>
        Admin panel
      </Typography>
    </Box>
  );
}

export { Header };
