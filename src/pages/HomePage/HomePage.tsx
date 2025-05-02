import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import CreateItemModal from "../../components/CreateItemModal";
import useUserData from "../../hooks/useUserData";

const HomePage: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const { users, loading, error, createUser, fetchUsers } = useUserData();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Full Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "age", headerName: "Age", flex: 0.5, minWidth: 90 },
  ];

  const handleCreateItem = async (newItem: {
    name: string;
    email: string;
    age: string;
  }) => {
    const userData = {
      name: newItem.name,
      email: newItem.email,
      age: Number(newItem.age),
    };
    return await createUser(userData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        p: { xs: 2, sm: 3 },
        gap: 3,
      }}
    >
      {/* Header with title and button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            User Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage your user data
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{ height: "fit-content" }}
          disabled={loading}
        >
          + Create User
        </Button>
      </Box>

      {/* Error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading indicator or DataGrid */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: 400,
            "& .MuiDataGrid-root": {
              border: "none",
              boxShadow: 2,
              borderRadius: 2,
            },
          }}
        >
          <DataGrid
            rows={users}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            sx={{
              width: "100%",
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
            }}
            density="comfortable"
          />
        </Box>
      )}

      <CreateItemModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreateItem}
        loading={loading}
      />
    </Box>
  );
};

export default HomePage;
