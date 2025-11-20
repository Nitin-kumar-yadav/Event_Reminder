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
