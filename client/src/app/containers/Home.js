import {
  ArticlesTable,
  Error,
  NoResults,
  SearchField,
  SelectField,
} from "../components";
import { useGetArticlesQuery } from "../store/api";
import { useState } from "react";
import { countriesConstants, categoriesConstants } from "../utils/";
import Box from "@mui/material/Box";
import debounce from "debounce";
import { Button, TablePagination, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const DEFAULT_SEARCH = "Sport"

function HomeContainer() {
  const [values, setValues] = useState({
    search: DEFAULT_SEARCH,
  });
  const [paginationState, setPaginationState] = useState({
    page: 0,
    pageSize: 10,
  });
  const { data, isFetching, error } = useGetArticlesQuery({
    ...values,
    ...paginationState,
    search: values?.search || DEFAULT_SEARCH,
    page: paginationState.page + 1,
  });
  const [showFilters, setShowFilters] = useState(false);

  function onChange(event) {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleShowFilters() {
    if (showFilters) {
      setValues((prev) => ({ search: prev.search }));
    }

    setShowFilters((prev) => !prev);
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Formula Top Headlines</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <SearchField
            id="search"
            label="Search article"
            onChange={debounce(onChange, 500)}
          />
          <Button
            startIcon={<FilterAltIcon />}
            variant="contained"
            onClick={handleShowFilters}
          >
            Filters
          </Button>
        </Box>
      </Box>
      {showFilters ? (
        <Box sx={{ display: "flex", gap: 3, width: "50%" }}>
          <SelectField
            id="country"
            value={values.country}
            label="Country"
            onChange={onChange}
            options={countriesConstants}
          />
          <SelectField
            id="category"
            value={values.category}
            label="Category"
            onChange={onChange}
            options={categoriesConstants}
          />
        </Box>
      ) : null}
      {data?.articles?.length !== 0 ? (
        <>
          <ArticlesTable rows={data?.articles} isLoading={isFetching} />
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
  );
}

export { HomeContainer };
