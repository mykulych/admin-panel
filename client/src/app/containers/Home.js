import {
  Table,
  Error,
  NoResults,
  UserModal,
} from "../components";
import {
  useCreateUserMutation,
  useGetUsersQuery,
  useRemoveUserMutation,
  useUpdateUserMutation,
} from "../store/api";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Button, TablePagination, Typography } from "@mui/material";

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
  const { data, isLoading, error } = useGetUsersQuery({
    ...paginationState,
    page: paginationState.page + 1,
  });
  const [createUser, { isLoading: isCreateLoading }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
  const [removeUser] = useRemoveUserMutation();

  async function handleCreate(data) {
    try {
      await createUser(data).unwrap();
      handleModalClose();
    } catch (error) {
      console.log(error);
      handleModalClose();
    }
  }

  async function handleEdit(data) {
    try {
      await updateUser(data).unwrap();
      handleModalClose();
    } catch (error) {
      console.error(error);
      handleModalClose();
    }
  }

  async function handleRemove(userId) {
    try {
      await removeUser(userId).unwrap();
    } catch (error) {
      console.error(error);
    }
  }

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
      <UserModal
        {...modalState}
        handleClose={handleModalClose}
        isLoading={isCreateLoading || isUpdateLoading}
      />
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
              isLoading={isLoading}
              handleModalOpen={(payload) =>
                handleModalOpen({ ...payload, onSubmit: handleEdit })
              }
              handleRemove={handleRemove}
            />
            {!isLoading ? (
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
