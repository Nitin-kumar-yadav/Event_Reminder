import Event from "../model/eventModel.js";
import User from "../model/userModel.js";

export const createEvent = async (req, res) => {
  const { title, description, time, date } = req.body;
  const userId = req.user._id;
  if ((!title || !description, !date)) {
    res.status(400).json({ message: "Title, Description, Date is required" });
  }
  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const event = await Event.findOne({ title });
    if (event) {
      res.status(400).json({ message: "Event already added" });
    }

    const newEvent = new Event({
      title,
      description,
      time,
      date,
      user: userId,
    });
    const user = await User.findById(userId);
    if (!user.events) {
      user.events = [];
    }
    user.events.push(newEvent._id);
    await user.save();
    const savedEvent = await newEvent.save();
    if (!savedEvent) {
      res.status(400).json({ message: "Event is not save in the database" });
    }
    res.status(200).json({
      _id: savedEvent._id,
      title: savedEvent.title,
      description: savedEvent.description,
      time: savedEvent.time,
      date: savedEvent.date,
      user: savedEvent.user,
    });
  } catch (error) {
    console.error("Create Event Error", error);
    res.status(500).json({ message: "Create Event Error" });
  }
};

export const viewEvent = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required in the URL." });
    }
    const showEvent = await Event.find({ user: userId });

    if (showEvent.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for this user." });
    }
    res.status(200).json(showEvent);
    
  } catch (error) {
    console.log("Error in viewEvent:", error.message);

    if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid User ID format." });
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const editEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
      const { title, description, time, date } = req.body;

      if (!eventId) {
        return res.status(400).json({ message: "Event ID is required" });
      }

      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      event.title = title || event.title;
      event.description = description || event.description;
      event.time = time || event.time;
      event.date = date || event.date;

      const updatedEvent = await event.save();
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.log("Error in editEvent:", error.message);

      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid Event ID format" });
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const deleteEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
      if (!eventId) {
        return res.status(400).json({ message: "Event ID is required" });
      }

      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      await Event.findByIdAndDelete(eventId);
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      console.log("Error in deleteEvent:", error.message);

      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid Event ID format" });
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  };
