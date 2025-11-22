import { create } from "zustand";
import { BasicUrl } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

export const useUserAuthStore = create((set, get) => ({
  authUser: (() => {
    const storedUser = localStorage.getItem("authUser");
    try {
      return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Error parsing authUser from localStorage:", e);
      return null;
    }
  })(),
  isChecking: true,
  isSignUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const response = await axios.get(`${BasicUrl}/api/v1/check-auth`, {
        withCredentials: true,
      });
      set({ authUser: response.data.user });
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
      toast.error("Failed to verify authentication status.");
    } finally {
      set({ isChecking: false });
    }
  },

  signup: async (data) => {
    set({ isSignUp: true });
    try {
      const res = await axios.post(`${BasicUrl}/api/v1/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const user = res.data.user || res.data;
      set({ authUser: user });
      localStorage.setItem("authUser", JSON.stringify(user));
      toast.success(`Signup successful! Welcome, ${user.username}`);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      set({ isSignUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post(`${BasicUrl}/api/v1/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const user = res.data.user || res.data;
      set({ authUser: user });
      localStorage.setItem("authUser", JSON.stringify(user));
      toast.success(`Login successful! Welcome, ${user.username}`);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axios.get(
        `${BasicUrl}/api/v1/logout`,

        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("authUser");
      set({ authUser: null });
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  },
}));
