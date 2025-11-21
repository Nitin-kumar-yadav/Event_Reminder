import { create } from "zustand";
import { BasicUrl } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

export const useUserAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
  isChecking: true,
  isSignUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const response = await axios.get(`${BasicUrl}/api/v1/check-auth`, {
        withCredentials: true,
      });
      if (response.ok) {
        const data = await response.json();
        set({ authUser: data.user });
      } else {
        set({ authUser: null });
      }
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
      set({ authUser: res.data.user });
      toast.success(`Signup successful! Welcome, ${res.data.user.username}`);
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
      await axios.post(
        `${BasicUrl}/api/v1/logout`,
        {},
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
