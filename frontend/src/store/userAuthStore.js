import { create } from "zustand";
import { BasicUrl } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

export const useUserAuthStore = create((set, get) => ({
  authUser: (() => {
    const storedUser = localStorage.getItem("authUser");
    try {
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
    } catch (e) {
      console.error("Error parsing authUser from localStorage:", e);
      return null;
    }
  })(),

  isChecking: true,
  isSignUp: false,
  isLoggingIn: false,
  isOtpVerifying: false,

  checkAuth: async () => {
    try {
      const res = await axios.get(`${BasicUrl}/api/v1/check-auth`, {
        withCredentials: true,
      });

      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isChecking: false });
    }
  },

  signup: async (userData) => {
    set({ isSignUp: true });

    try {
      const res = await axios.post(`${BasicUrl}/api/v1/signup`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });


      return res.data.user;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
      return null;
    } finally {
      set({ isSignUp: false });
    }
  },

  otpVerify: async (otpData) => {
    set({ isOtpVerifying: true });

    try {
      const res = await axios.post(`${BasicUrl}/api/v1/verify-email`, otpData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      const user = res.data;

      set({ authUser: user });
      localStorage.setItem("authUser", JSON.stringify(user));

      return user;
    } catch (error) {
      console.error("OTP Verify Error:", error);
      toast.error(error?.response?.data?.message || "OTP verification failed");
      return null;
    } finally {
      set({ isOtpVerifying: false });
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

      const user = res.data;

      set({ authUser: user });
      localStorage.setItem("authUser", JSON.stringify(user));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axios.get(`${BasicUrl}/api/v1/logout`, {
        withCredentials: true,
      });

      localStorage.removeItem("authUser");
      set({ authUser: null });
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  },
}));
