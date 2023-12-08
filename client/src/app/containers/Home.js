import {
  Table,
  Error,
  NoResults,
  SearchField,
  SelectField,
  UserModal,
} from "../components";
import { useGetUsersQuery } from "../store/api";
import { useState } from "react";
import { countriesConstants, categoriesConstants } from "../utils/";
import Box from "@mui/material/Box";
import debounce from "debounce";
import { Button, TablePagination, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

function HomeContainer() {
  const [paginationState, setPaginationState] = useState({
    page: 0,
    pageSize: 10,
  });
  const [modalState, setModalState] = useState({
    open: false,
    modalTitle: "",
    data: {},
    onSubmit: () => {},
  });
  const { data, isFetching, error } = useGetUsersQuery({
    ...paginationState,
    page: paginationState.page + 1,
  });

  function handleCreate(data) {
    console.log("create data: ", data);
  }

  function handleEdit(data) {
    console.log("edit data: ", data)
  }

  function handleRemove() {}

  function handleModalOpen(payload) {
    setModalState((prev) => ({ ...prev, data: {}, ...payload, open: true }));
  }

  function handleModalClose() {
    setModalState((prev) => ({ ...prev, open: false }));
  }

  function handleChangePage(event, newPage) {
    setPaginationState((prev) => ({ ...prev, page: newPage }));
  }

  function handleChangeRowsPerPage(event) {
    setPaginationState((prev) => ({
      ...prev,
      pageSize: parseInt(event.target.value, 10),
      page: 0,
    }));
  }

  if (error) {
    console.error(error);
    return <Error message={error?.data?.message} />;
  }

  return (
    <>
      <UserModal {...modalState} handleClose={handleModalClose} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Users table</Typography>
          <Button
            variant="contained"
            sx={{
              fontSize: "16px",
            }}
            onClick={() =>
              handleModalOpen({
                open: true,
                modalTitle: "Create user",
                onSubmit: handleCreate,
              })
            }
          >
            Create user
          </Button>
        </Box>
        {data?.users?.length !== 0 ? (
          <>
            <Table
              rows={data?.users}
              isLoading={isFetching}
              handleModalOpen={(payload) =>
                handleModalOpen({ ...payload, onSubmit: handleEdit })
              }
            />
            {!isFetching ? (
              <TablePagination
                component="div"
                count={data?.totalResults}
                page={paginationState.page}
                onPageChange={handleChangePage}
                rowsPerPage={paginationState.pageSize}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            ) : null}
          </>
        ) : (
          <NoResults content="No results found!" />
        )}
      </Box>
    </>
  );
}

export { HomeContainer };
