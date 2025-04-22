import { Ticket } from "../models/Ticket";

const tickets: Ticket[] = [];

export const TicketStore = {
    getAll: () => tickets,
    add: (ticket: Ticket) => tickets.push(ticket),
    updateStatus(id: string, newStatus: Ticket["status"]): Ticket {
        const ticketIndex = tickets.findIndex(t => t.id === id);
        if (ticketIndex === -1) {
            throw new Error("Ticket não encontrado");
        }
        tickets[ticketIndex].status = newStatus;
        return tickets[ticketIndex];
    }
};
