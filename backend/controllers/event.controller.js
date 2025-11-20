import Event from "../model/eventModel.js";

export const createEvent = async (req, res) => {
  const { title, description, time, date } = req.body;
  if ((!title || !description, !date)) {
    res.status(400).json({ message: "Title, Description, Date is required" });
  }
  try {
    const event = await Event.findOne({ title });
    if (event) {
      res.status(400).json({ message: "Event already added" });
    }

    const newEvent = new Event({
      title,
      description,
      time,
      date,
    });
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
    });
  } catch (error) {
    console.error("Create Event Error", error);
    res.status(500).json({ message: "Create Event Error" });
  }
};

export const viewEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }
    const showEvent = await Event.findById(eventId);

    if (!showEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(showEvent);
  } catch (error) {
    console.log("Error in viewEvent:", error.message);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Event ID format" });
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
