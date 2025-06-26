import axios from "axios";

export const logout = async ({
  setIsAuthenticated,
  setUser,
}: {
  setIsAuthenticated: (val: boolean | null) => void;
  setUser: (user: any) => void;
}) => {
  try {
    await axios.post("http://localhost:3000/api/auth/logout", {}, {
      withCredentials: true,
    });

    setIsAuthenticated(false);
    setUser(null);

    // Reload the page
    window.location.reload();

    console.log("Logged out successfully");
  } catch (err) {
    console.error("Logout failed:", err);
  }
};
