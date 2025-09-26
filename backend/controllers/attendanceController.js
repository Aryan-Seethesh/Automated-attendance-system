const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const { sendSMS } = require('../utils/smsUtils');

exports.markAttendance = async (req, res) => {
  const { studentId, date, status = "Present" } = req.body;
  try {
    const attendance = await Attendance.create({ student: studentId, date, status });
    // Fetch student info for SMS
    const student = await Student.findById(studentId);
    if (student && student.parentPhone) {
      let message;
      if (status === "Present") {
        message = `Dear Parent, your child ${student.name} was present in class on ${date}.`;
      } else {
        message = `Dear Parent, your child ${student.name} was absent in class on ${date}.`;
      }
      await sendSMS(student.parentPhone, message);
    }
    res.json({ success: true, attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAttendanceByDate = async (req, res) => {
  const { date } = req.query;
  try {
    const records = await Attendance.find({ date }).populate('student');
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAttendanceStats = async (req, res) => {
  // Advanced stats: per class, per day, etc.
  try {
    const stats = await Attendance.aggregate([
      {
        $group: {
          _id: { date: "$date", status: "$status" },
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};