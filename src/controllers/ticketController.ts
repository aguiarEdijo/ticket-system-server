import { Request, Response } from "express";
import { Ticket } from "../models/Ticket";
import { TicketStore } from "../storage/ticketStore";
import { v4 as uuidv4 } from 'uuid';


export const getTickets = (_req: Request, res: Response<Ticket[]>) => {
    res.json(TicketStore.getAll());
};

export const createTicket = (req: Request<{}, {}, Omit<Ticket, "id" | "status">>, res: Response<Ticket>) => {
    const { title, description, deadline, assignedTo } = req.body;

    if (!title || !description || !deadline) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." } as never);
    }

    const newTicket: Ticket = {
        id: uuidv4(),
        title,
        description,
        deadline,
        assignedTo,
        status: "pending",
    };

    TicketStore.add(newTicket);
    res.status(201).json(newTicket);
};

export const updateTicketStatus = (req: Request<{ id: string }, {}, { status: Ticket["status"] }>, res: Response<Ticket>) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'in_progress', 'completed'].includes(status)) {
        return res.status(400).json({ error: "Status inválido ou ausente." } as never);
    }

    try {
        const updatedTicket = TicketStore.updateStatus(id, status);
        res.json(updatedTicket);
    } catch (error) {
        res.status(404).json({ error: "Ticket não encontrado." } as never);
    }
};