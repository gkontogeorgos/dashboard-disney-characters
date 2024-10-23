import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  setCurrentPage,
  setPageSize,
  setSearchTerm,
} from "../../redux/charactersSlice";
import CharacterModal from "./CharacterModal";
import { Grid2 } from "@mui/material";
import styled from "styled-components";
import Loader from "common/components/Loader";

const StyledDataGrid = styled(DataGrid)`
  & .MuiDataGrid-root {
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  & .MuiDataGrid-columnHeaders {
    background-color: #f0f0f0;
    color: #333;
    font-weight: bolder;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
  }
  & .MuiDataGrid-row {
    background-color: #fff;
    &:nth-of-type(even) {
      background-color: #f9f9f9;
    }
    &:hover {
      background-color: #f1f1f1;
    }
  }
  & .MuiDataGrid-cell {
    border-bottom: 1px solid #e0e0e0;
  }
  & .MuiDataGrid-row:hover {
    cursor: pointer;
  }
  & .Mui-selected {
    background-color: rgb(214, 235, 255);
    &:hover {
      background-color: deepBlue.dark;
    }
  }
`;

const CharacterTable = ({ characters }) => {
  const dispatch = useDispatch();
  const { status, currentPage, pageSize, searchTerm } = useSelector(
    (state) => state.characters
  );
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);

  useEffect(() => {
    if (Array.isArray(characters)) {
      setFilteredList(characters);
    } else if (typeof characters === "object" && characters !== null) {
      setFilteredList([characters]);
    } else {
      setFilteredList([]);
    }
  }, [characters]);
  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage + 1));
  };

  const handlePageSizeChange = (event) => {
    dispatch(setPageSize(event.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleRowClick = (params) => {
    setSelectedCharacter(params.row);
    setSelectedRowId(params.id);
  };

  const columns = [
    {
      field: "name",
      headerName: "Character Name",
      flex: 1,
      valueGetter: (params) => params || "--",
      sortable: true,
    },
    {
      field: "tvShows",
      headerName: "TV Shows",
      width: 130,
      valueGetter: (params) => (params?.length > 0 ? params : "--"),
      sortable: false,
    },
    {
      field: "videoGames",
      headerName: "Video Games",
      width: 130,
      valueGetter: (params) => (params?.length > 0 ? params : "--"),
      sortable: false,
    },
    {
      field: "allies",
      headerName: "Allies",
      flex: 1,
      valueGetter: (params) => (params?.length > 0 ? params : "--"),
      sortable: false,
    },
    {
      field: "enemies",
      headerName: "Enemies",
      flex: 1,
      valueGetter: (params) => (params?.length > 0 ? params.value : "--"),
      sortable: false,
    },
  ];

  return (
    <div style={{ height: 400 }}>
      <Grid2 container sx={{ mb: 2 }} spacing={2}>
        <Grid2 sx={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              variant="outlined"
              slotProps={{
                input: {
                  sx: {
                    fontStyle: "italic",
                  },
                },
              }}
              value={searchTerm}
              label="Search Character..."
              onChange={handleSearchChange}
            />
          </FormControl>
        </Grid2>
        <Grid2 sx={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="page-size-select">Page Size</InputLabel>
            <Select
              value={pageSize}
              label="Page Size"
              style={{ minWidth: 160 }}
              onChange={handlePageSizeChange}
            >
              {[10, 20, 50, 100, 200, 500].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
      <StyledDataGrid
        rows={filteredList}
        columns={columns}
        pageSize={pageSize}
        paginationMode="client"
        page={currentPage - 1}
        onPageChange={handlePageChange}
        loading={status === "LOADING"}
        onRowClick={handleRowClick}
        getRowId={(row) => row._id || Math.random().toString()}
        components={{
          LoadingOverlay: Loader,
        }}
        disableColumnMenu={true}
        isRowSelectable={() => true}
        getRowClassName={(params) =>
          params.id === selectedRowId ? "Mui-selected" : ""
        }
      />
      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          open={!!selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default CharacterTable;
