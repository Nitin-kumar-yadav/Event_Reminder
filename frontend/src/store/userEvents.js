import axios from "axios";
import { create } from "zustand";
import { BasicUrl } from "../main";
import toast from "react-hot-toast";

export const useUserEventsStore = create((set, get) => ({
  userEvents: [],
  isEventsLoading: false,

  createEvent: async (eventData) => {
    set({ isEventsLoading: true });
    try {
      const response = await axios.post(
        `${BasicUrl}/api/v1/event/create`,
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const eventInfo = response?.data?.user || response?.data;
      set((state) => {
        const updatedEvents = [...state.userEvents, eventInfo];
        localStorage.setItem("userEvents", JSON.stringify(updatedEvents));
        return { userEvents: updatedEvents };
      });
      toast.success("Event created successfully!");
    } catch (error) {
      toast.error("Failed to create event. Please try again.");
      console.error("Error creating event:", error);
    } finally {
      set({ isEventsLoading: false });
    }
  },

  getEvents: async () => {
    set({ isEventsLoading: true });
    let userId = get().authUser?._id;

    if (!userId) {
      try {
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
          const userObject = JSON.parse(storedUser);
          userId = userObject?._id;
        }
      } catch (e) {
        toast.error("Failed to retrieve user information.");
        console.error("Failed to parse user from localStorage:", e);
      }
    }

    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return set({ isEventsLoading: false });
    }
    try {
      const response = await axios.get(`${BasicUrl}/api/v1/event/${userId}`, {
        withCredentials: true,
      });

      let eventsData = response.data;
      if (!Array.isArray(eventsData)) {
        console.warn(eventsData);
        eventsData = [];
      }
      set({ userEvents: eventsData });
      localStorage.setItem("userEvents", JSON.stringify(eventsData));
    } catch (error) {
      toast.error("Failed to fetch events. Please try again.");
      console.error("Error fetching events:", error);
    } finally {
      set({ isEventsLoading: false });
    }
  },

  deleteEvent: async (eventId) => {
    set({ isEventsLoading: true });
    try {
      await axios.delete(`${BasicUrl}/api/v1/event/delete/${eventId}`, {
        withCredentials: true,
      });
      const updatedEvents = get().userEvents.filter(
        (event) => event._id !== eventId
      );
      set({ userEvents: updatedEvents });
      localStorage.setItem("userEvents", JSON.stringify(updatedEvents));
      toast.success("Event deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete event. Please try again.");
      console.error("Error deleting event:", error);
    } finally {
      set({ isEventsLoading: false });
    }
  },

  updateEvent: async (eventId, updatedData) => {
    set({ isEventsLoading: true });
    try {
      const response = await axios.put(
        `${BasicUrl}/api/v1/event/update/${eventId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const updatedEvent = response.data;
      const updatedEvents = get().userEvents.map((event) =>
        event._id === eventId ? updatedEvent : event
      );
      set({ userEvents: updatedEvents });
      localStorage.setItem("userEvents", JSON.stringify(updatedEvents));
      toast.success("Event updated successfully!");
    } catch (error) {
      toast.error("Failed to update event. Please try again.");
      console.error("Error updating event:", error);
    } finally {
      set({ isEventsLoading: false });
    }
  },
}));
