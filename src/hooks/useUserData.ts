import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const API_URL = "https://react-test-adsk.free.beeceptor.com/todos";

const useUserData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: Omit<User, "id">) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Failed to create user");

      // Refetch the updated user list
      await fetchUsers();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, createUser, fetchUsers };
};

export default useUserData;
