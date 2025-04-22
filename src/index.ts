import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/tickets";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/tickets", ticketRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server rodando em http://localhost:${PORT}`);
});
