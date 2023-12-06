import { Link, useParams } from "react-router-dom";
import { useGetArticlesQuery } from "../store/api";
import { Box, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Error, Spinner } from "../components";

function ArticleContainer() {
  const { articleTitle } = useParams();
  const { data, isLoading, error } = useGetArticlesQuery({
    search: articleTitle,
  });
  if (isLoading) return <Spinner />;

  if (error) return <Error ssage={error?.data?.message} />;

  const {
    title,
    source,
    publishedAt,
    description,
    content,
    author,
    urlToImage,
  } = data?.articles[0] || {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginBottom: 4,
        }}
      >
        <Link to="/">
          {" "}
          <KeyboardBackspaceIcon fontSize="large" />{" "}
        </Link>
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Source {source.name}</Typography>
        <Typography variant="h6">Publication date: {publishedAt}</Typography>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Description
      </Typography>
      <Typography variant="h6">{description}</Typography>
      <img src={urlToImage} alt="article" style={{ width: "100%" }} />
      {content ? (
        <>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Content
          </Typography>
          <Typography
            variant="h6"
            sx={{ marginBottom: 5 }}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </>
      ) : null}
      <Typography variant="h6">Author: {author}</Typography>
    </Box>
  );
}

export { ArticleContainer };
