import { Router } from "express";
import {
  createPatient,
  deletePatient,
  getPatient,
  getPatients,
} from "../controllers/patient.controller";

const router = Router();

router.post("/", createPatient);
router.get("/", getPatients);
router.get("/:id", getPatient);
router.delete("/:id", deletePatient);

export default router;
