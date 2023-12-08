import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "end",
        paddingY: 4,
        marginTop: 10,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h5">Admin panel</Typography>
        <Typography>@Admin 2023, All Rights Reserved</Typography>
      </Box>
      <Typography>info@formula.com</Typography>
    </Box>
  );
}

export { Footer };
