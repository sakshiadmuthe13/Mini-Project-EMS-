import Department from '../models/Department.js';
import mongoose from 'mongoose';

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ success: true, departments });
  } catch (error) {
    console.error("Get Departments Error:", error);
    res.status(500).json({ success: false, error: "Server error getting departments" });
  }
};

// Add new department
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    if (!dep_name || dep_name.trim() === '') {
      return res.status(400).json({ success: false, error: "Department name is required" });
    }

    const newDepartment = new Department({
      dep_name: dep_name.trim(),
      description: description?.trim() || ''
    });

    const saved = await newDepartment.save();
    res.status(201).json({ success: true, department: saved });
  } catch (error) {
    console.error("Add Department Error:", error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }

    res.status(500).json({ success: false, error: "Server error adding department" });
  }
};

// Get single department
const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid department ID" });
    }

    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    res.status(200).json({ success: true, department });
  } catch (error) {
    console.error("Get Department Error:", error);
    res.status(500).json({ success: false, error: "Server error getting department" });
  }
};

// Update department
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid department ID" });
    }

    const updated = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    res.status(200).json({ success: true, department: updated });
  } catch (error) {
    console.error("Update Department Error:", error);
    res.status(500).json({ success: false, error: "Server error updating department" });
  }
};

// Delete department
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid department ID" });
    }

    const deleted = await Department.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    res.status(200).json({ success: true, department: deleted });
  } catch (error) {
    console.error("Delete Department Error:", error);
    res.status(500).json({ success: false, error: "Server error deleting department" });
  }
};

export {
  getDepartments,
  addDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment
};
