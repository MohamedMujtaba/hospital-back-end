import express, { Express } from "express";
import { Server } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import http from "http";
import cookieParser from "cookie-parser";

// Import Routes
import PatientRouter from "./src/routes/patient.route";
import WorkerRouter from "./src/routes/worker.route";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your client's URL
    methods: ["*"],
  },
});

app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(helmet());
app.use(cookieParser(process.env.JWT_SECRET!));

io.on("connection", (socket) => {
  console.log("New client connected");
  // ... handle socket events ...
});

// Routes
app.use("/api/v1/patients", PatientRouter);
app.use("/api/v1/workers", WorkerRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
