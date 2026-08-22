import { z } from "zod";

// Authentication Schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Employee Onboarding Schema
export const employeeSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  department: z.string().min(1, "Department is required"),
  role: z.string().min(1, "Role is required"),
  dateOfJoining: z.date({ message: "Date of joining is required" }),
  salary: z.number().min(0, "Salary must be positive"),
});

// Attendance clock-in schema
export const clockInSchema = z.object({
  notes: z.string().max(200).optional(),
  location: z.string().optional(),
});

// Leave Application Schema
export const leaveApplicationSchema = z.object({
  leaveType: z.enum(["annual", "sick", "unpaid", "maternity", "paternity"]),
  startDate: z.date({ message: "Start date is required" }),
  endDate: z.date({ message: "End date is required" }),
  reason: z.string().min(5, "Please provide a reason for the leave"),
});
