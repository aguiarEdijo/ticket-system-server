import { Request, Response } from "express";
import { Ticket } from "../models/Ticket";
import { TicketStore } from "../storage/ticketStore";
import { v4 as uuidv4 } from 'uuid';


type ErrorResponse = { error: string };

export const getTickets = (_req: Request, res: Response<Ticket[] | ErrorResponse>) => {
    try {
        const tickets = TicketStore.getAll();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tickets" });
    }
};

export const createTicket = (
    req: Request<{}, {}, Omit<Ticket, "id" | "status">>,
    res: Response<Ticket | ErrorResponse>
) => {
    try {
        const { title, description, deadline, assignedTo } = req.body;

        if (!title || !description || !deadline) {
            res.status(400).json({ error: "Campos obrigatórios ausentes." });
            return;
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
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar ticket" });
    }
};

export const updateTicketStatus = (
    req: Request<{ id: string }, {}, { status: Ticket["status"] }>,
    res: Response<Ticket | ErrorResponse>
) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !['pending', 'in_progress', 'completed'].includes(status)) {
            res.status(400).json({ error: "Status inválido ou ausente." });
            return;
        }

        const updatedTicket = TicketStore.updateStatus(id, status);
        res.json(updatedTicket);
    } catch (error) {
        res.status(404).json({ error: "Ticket não encontrado." });
    }
};