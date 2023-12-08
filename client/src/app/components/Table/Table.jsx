import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import LinkIcon from "@mui/icons-material/Link";
import { Link } from "react-router-dom";
import { Spinner } from "../Spinner";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function CustomTable({ rows, isLoading, handleModalOpen }) {
  if (isLoading) return <Spinner />;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Number phone</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>{row.number_phone}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.height}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell sx={{ maxWidth: "50px" }} align="center">
                <Button
                  onClick={() =>
                    handleModalOpen({ modalTitle: "Edit user", data: row })
                  }
                >
                  <EditIcon />
                </Button>
                <Button onClick={() => {}}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { CustomTable as Table };
