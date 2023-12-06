import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LinkIcon from "@mui/icons-material/Link";
import { Link } from "react-router-dom";
import { Spinner } from "../Spinner";

function ArticlesTable({ rows, isLoading }) {
  if (isLoading) return <Spinner />

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Authors</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Publication date</TableCell>
            <TableCell align="center">Original URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                <img
                  src={row.urlToImage}
                  alt={"article image"}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              </TableCell>
              <TableCell>
                <Link to={row.title}>{row.title}</Link>
              </TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.publishedAt}</TableCell>
              <TableCell>
                <Link to={row.url} target="_blank">
                  <LinkIcon fontSize="large" />{" "}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { ArticlesTable };
