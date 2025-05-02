import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useUserData from "./useUserData";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 35 },
];

describe("useUserData", () => {
  beforeEach(() => {
    // Properly typed mock implementation
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      })
    ) as unknown as typeof global.fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch users", async () => {
    const { result } = renderHook(() => useUserData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.users).toEqual(mockUsers);
    });
  });
});
