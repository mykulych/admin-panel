import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Spinner } from "../Spinner";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { countriesConstants } from "../../utils";

function CustomTable({ rows, isLoading, handleModalOpen, handleRemove }) {
  if (isLoading) return <Spinner />;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Number phone</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ createdAt, updatedAt, ...row }) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>{row.number_phone}</TableCell>
              <TableCell>{countriesConstants.find(x => x.value === row.country)?.label}</TableCell>
              <TableCell>{row.height}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell sx={{ maxWidth: "50px" }} align="center">
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    onClick={() =>
                      handleModalOpen({ modalTitle: "Edit user", data: row })
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemove(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { CustomTable as Table };
