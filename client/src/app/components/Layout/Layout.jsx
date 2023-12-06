import { Box } from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <Box sx={{ width: "100%", maxWidth: "1600px", m: "0 auto" }}>
        {children}
        <Footer />
      </Box>
    </>
  );
}

export { Layout };
