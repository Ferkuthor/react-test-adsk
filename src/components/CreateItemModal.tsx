import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "500px" },
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

interface CreateItemModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (item: {
    name: string;
    email: string;
    age: string;
  }) => Promise<boolean>;
  loading?: boolean;
}

const CreateItemModal: React.FC<CreateItemModalProps> = ({
  open,
  onClose,
  onCreate,
  loading = false,
}) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    age: "",
  });
  const [formError, setFormError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.age) {
      setFormError("All fields are required");
      return;
    }

    if (isNaN(Number(formData.age))) {
      setFormError("Age must be a number");
      return;
    }

    const success = await onCreate(formData);
    if (success) {
      setFormData({ name: "", email: "", age: "" });
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={3}>
          Create New User
        </Typography>
        {formError && (
          <Typography color="error" mb={2}>
            {formError}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              disabled={loading}
              inputProps={{ min: 0 }}
              required
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateItemModal;
