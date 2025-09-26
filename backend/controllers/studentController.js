const Student = require('../models/Student');

exports.registerStudent = async (req, res) => {
  const { name, class: className, parentPhone, photo, faceDescriptor } = req.body;
  try {
    const student = await Student.create({ name, class: className, parentPhone, photo, faceDescriptor });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};