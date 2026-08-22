export type UserRole = "admin" | "employee";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  displayName?: string;
  photoURL?: string;
}

export interface EmployeeProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  designation: string;
  dateOfJoining: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  salary: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "HALF_DAY";
  notes?: string;
  location?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: "annual" | "sick" | "unpaid" | "maternity" | "paternity";
  startDate: string;
  endDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  approvedBy?: string;
  createdAt: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  month: string; // e.g. "2026-08"
  baseSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: "UNPAID" | "PROCESSING" | "PAID";
  paidDate?: string;
}

export interface AssetRecord {
  id: string;
  name: string;
  serialNumber: string;
  type: string;
  assignedToEmployeeId?: string;
  assignedDate?: string;
  status: "AVAILABLE" | "ASSIGNED" | "MAINTENANCE" | "RETIRED";
}
