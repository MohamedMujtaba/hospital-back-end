import { Router } from "express";
import { getPatients } from "../controllers/patient.controller";

const router = Router();

router.post("/", getPatients);

export default router;
