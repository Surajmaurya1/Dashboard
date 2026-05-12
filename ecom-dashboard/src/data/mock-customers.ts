import type { Customer } from "@/types/customer";

export const mockCustomers: Customer[] = [
  { id: "CUS-001", name: "Aarav Sharma", email: "aarav@email.com", phone: "+91 98765 43210", totalOrders: 15, totalSpent: 45890, segment: "vip", status: "active", joinedAt: "2025-06-15T00:00:00Z", lastOrderAt: "2026-05-11T06:00:00Z" },
  { id: "CUS-002", name: "Priya Patel", email: "priya@email.com", phone: "+91 87654 32109", totalOrders: 8, totalSpent: 28450, segment: "returning", status: "active", joinedAt: "2025-09-01T00:00:00Z", lastOrderAt: "2026-05-05T08:15:00Z" },
  { id: "CUS-003", name: "Rohan Verma", email: "rohan@email.com", phone: "+91 76543 21098", totalOrders: 12, totalSpent: 38920, segment: "vip", status: "active", joinedAt: "2025-07-20T00:00:00Z", lastOrderAt: "2026-05-12T04:00:00Z" },
  { id: "CUS-004", name: "Sneha Iyer", email: "sneha@email.com", phone: "+91 65432 10987", totalOrders: 3, totalSpent: 5690, segment: "new", status: "active", joinedAt: "2026-04-01T00:00:00Z", lastOrderAt: "2026-05-10T09:20:00Z" },
  { id: "CUS-005", name: "Kunal Mehra", email: "kunal@email.com", phone: "+91 54321 09876", totalOrders: 6, totalSpent: 15780, segment: "at_risk", status: "active", joinedAt: "2025-11-10T00:00:00Z", lastOrderAt: "2026-03-15T16:30:00Z" },
  { id: "CUS-006", name: "Ananya Gupta", email: "ananya@email.com", phone: "+91 43210 98765", totalOrders: 9, totalSpent: 22340, segment: "returning", status: "active", joinedAt: "2025-08-05T00:00:00Z", lastOrderAt: "2026-04-28T11:00:00Z" },
  { id: "CUS-007", name: "Vikram Singh", email: "vikram@email.com", phone: "+91 32109 87654", totalOrders: 4, totalSpent: 19450, segment: "returning", status: "active", joinedAt: "2025-12-01T00:00:00Z", lastOrderAt: "2026-05-06T13:00:00Z" },
  { id: "CUS-008", name: "Neha Reddy", email: "neha@email.com", phone: "+91 21098 76543", totalOrders: 2, totalSpent: 3890, segment: "new", status: "active", joinedAt: "2026-03-15T00:00:00Z", lastOrderAt: "2026-05-09T10:00:00Z" },
  { id: "CUS-009", name: "Arjun Das", email: "arjun@email.com", phone: "+91 10987 65432", totalOrders: 7, totalSpent: 18920, segment: "returning", status: "active", joinedAt: "2025-10-20T00:00:00Z", lastOrderAt: "2026-04-25T15:00:00Z" },
  { id: "CUS-010", name: "Divya Nair", email: "divya@email.com", phone: "+91 98761 23456", totalOrders: 5, totalSpent: 12340, segment: "returning", status: "active", joinedAt: "2025-11-25T00:00:00Z", lastOrderAt: "2026-05-02T07:30:00Z" },
  { id: "CUS-011", name: "Rajesh Kumar", email: "rajesh@email.com", phone: "+91 87651 23456", totalOrders: 1, totalSpent: 1299, segment: "new", status: "inactive", joinedAt: "2026-01-10T00:00:00Z", lastOrderAt: "2026-01-10T00:00:00Z" },
  { id: "CUS-012", name: "Meera Joshi", email: "meera@email.com", phone: "+91 76541 23456", totalOrders: 0, totalSpent: 0, segment: "inactive", status: "blocked", joinedAt: "2025-05-01T00:00:00Z", lastOrderAt: "2025-05-01T00:00:00Z" },
];
