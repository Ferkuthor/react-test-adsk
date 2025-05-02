import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const API_URL = "https://react-test-adsk.free.beeceptor.com/users";

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
      /* 
      // Test with Too Many Requests
      setUsers([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          age: 35,
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          age: 28,
        },
        {
          id: 3,
          name: "Bob Johnson",
          email: "bob@example.com",
          age: 42,
        },
        {
          id: 4,
          name: "Alice Williams",
          email: "alice@example.com",
          age: 31,
        },
        {
          id: 5,
          name: "Charlie Brown",
          email: "charlie@example.com",
          age: 25,
        },
      ]); */

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

  return { users, loading, error, createUser };
};

export default useUserData;
