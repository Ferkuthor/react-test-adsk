import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CreateItemModal from "../../components/CreateItemModal";
import useUserData from "../../hooks/useUserData";

const HomePage: React.FC = () => {
  /* States */
  const [openModal, setOpenModal] = useState(false);
  const { users, loading, error, createUser } = useUserData();

  /* Theme */
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  /* Columns config */
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Full Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "age", headerName: "Age", width: 90 },
  ];

  /* Create item */
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
        p: isSmallScreen ? 1 : 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isSmallScreen ? "flex-start" : "center",
          mb: 2,
        }}
      >
        {/* Tittle */}
        <Box>
          <Typography variant={isSmallScreen ? "h5" : "h4"} component="h1">
            User Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your user data
          </Typography>
        </Box>

        {/* Create button */}
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          size={isSmallScreen ? "small" : "medium"}
          disabled={loading}
          sx={{ mt: isSmallScreen ? 1 : 0 }}
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

      {/* Data Grid */}
      <Box
        sx={{
          width: "100%",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={users}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            density={isSmallScreen ? "compact" : "standard"}
          />
        )}
      </Box>

      {/* Modal */}
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
