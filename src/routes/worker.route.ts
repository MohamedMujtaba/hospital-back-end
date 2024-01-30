import { Router } from "express";
import { login, register } from "../controllers/worker.controller";

const router = Router();

router.post("/", register);
router.post("/login", login);

export default router;
