import axios from "axios";

export const logout = async ({
  setIsAuthenticated,
  setUser,
}: {
  setIsAuthenticated: (val: boolean | null) => void;
  setUser: (user: any) => void;
}) => {
  try {
    await axios.post("https://4843cb49-1974-4419-8905-97420a96b80d-00-1kal2br4fska4.sisko.replit.dev/api/auth/logout", {}, {
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
