// Application Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    EMPLOYEES: "/admin/employees",
    ATTENDANCE: "/admin/attendance",
    LEAVE: "/admin/leave",
    PAYROLL: "/admin/payroll",
    RECRUITMENT: "/admin/recruitment",
    PERFORMANCE: "/admin/performance",
    TRAINING: "/admin/training",
    ASSETS: "/admin/assets",
    SETTINGS: "/admin/settings",
    PROFILE: "/admin/profile",
  },
  EMPLOYEE: {
    DASHBOARD: "/employee/dashboard",
    PROFILE: "/employee/profile",
    ATTENDANCE: "/employee/attendance",
    LEAVE: "/employee/leave",
    PAYROLL: "/employee/payroll",
    TRAINING: "/employee/training",
    DOCUMENTS: "/employee/documents",
    NOTIFICATIONS: "/employee/notifications",
  },
} as const;

// Domain Configurations
export const DEPARTMENTS = [
  "Engineering",
  "Product Management",
  "Human Resources",
  "Finance & Payroll",
  "Sales & Marketing",
  "Customer Success",
  "Operations",
] as const;

export const EMPLOYEE_ROLES = [
  "Intern",
  "Junior Associate",
  "Senior Associate",
  "Team Lead",
  "Manager",
  "Director",
  "VP",
  "C-Level Exec",
] as const;

export const LEAVE_TYPES = {
  ANNUAL: "annual",
  SICK: "sick",
  UNPAID: "unpaid",
  MATERNITY: "maternity",
  PATERNITY: "paternity",
} as const;

export const LEAVE_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export const ATTENDANCE_STATUS = {
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
  LATE: "LATE",
  HALF_DAY: "HALF_DAY",
} as const;
