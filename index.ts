import express, { Express } from "express";
import { Server } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import http from "http";
import { prisma } from "./src/utils/prisma";

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

io.on("connection", (socket) => {
  console.log("New client connected");
  // ... handle socket events ...
});

// instrument(io, {
//   auth: {
//     type: "basic",
//     username: "admin",
//     password: "12345", // "changeit" encrypted with bcrypt
//   },

//   mode: "development",
// });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
