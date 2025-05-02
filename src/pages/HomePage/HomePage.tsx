import React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Box, Typography, Button } from "@mui/material";
import CreateItemModal from "../../components/CreateItemModal";

const HomePage: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [rows, setRows] = React.useState<GridRowsProp>([
    { id: 1, name: "John Doe", email: "john@example.com", age: 35 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 28 },
    // Add more sample data to demonstrate 20 items per page
    ...Array.from({ length: 18 }, (_, i) => ({
      id: i + 3,
      name: `User ${i + 3}`,
      email: `user${i + 3}@example.com`,
      age: Math.floor(Math.random() * 50) + 20,
    })),
  ]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Full Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "age", headerName: "Age", flex: 0.5, minWidth: 90 },
  ];

  const handleCreateItem = (newItem: {
    name: string;
    email: string;
    age: string;
  }) => {
    const newId =
      rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    setRows((prev) => [
      ...prev,
      {
        id: newId,
        name: newItem.name,
        email: newItem.email,
        age: parseInt(newItem.age),
      },
    ]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh", // Ensure full viewport height
        p: { xs: 2, sm: 3 },
        gap: 3,
      }}
    >
      {/* Header with title and button - aligned to top */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start", // Changed to flex-start for top alignment
          width: "100%",
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Overview of your recent data and activities
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{ height: "fit-content" }}
        >
          + Create Item
        </Button>
      </Box>

      {/* DataGrid - full width and height */}
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 200px)", // Adjust based on your header height
          "& .MuiDataGrid-root": {
            border: "none",
            boxShadow: 2,
            borderRadius: 2,
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid",
            borderColor: "divider",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20, page: 0 }, // Default to 20 items per page
            },
          }}
          sx={{
            width: "100%",
            "& .MuiDataGrid-virtualScroller": {
              overflowX: "hidden", // Cleaner scroll behavior
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
          density="comfortable"
        />
      </Box>

      <CreateItemModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreateItem}
      />
    </Box>
  );
};

export default HomePage;
