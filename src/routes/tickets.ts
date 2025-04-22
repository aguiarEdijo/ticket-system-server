import { Router } from "express";
import { createTicket, getTickets, updateTicketStatus } from "../controllers/ticketController";


const router = Router();

router.get("/", getTickets);
router.post("/", createTicket);
router.patch("/:id/status", updateTicketStatus);

export default router;
