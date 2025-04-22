export type TicketStatus = "pending" | "in_progress" | "completed";

export interface Ticket {
    id: string;
    title: string;
    description: string;
    deadline: string;
    assignedTo?: string;
    status: TicketStatus;
}
