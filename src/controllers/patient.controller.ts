import { Response, Request } from "express";
import {
  CreatePatientReq,
  DeletePatientReq,
  GetPatientReq,
  GetPatientsReq,
} from "../types/patient.type";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../utils/prisma";
import { createPatientId } from "../utils/create-patient-id";

export const createPatient = async (req: CreatePatientReq, res: Response) => {
  const { name, age, gander, phoneNumber } = req.body;
  try {
    const patientWithTheSameName = await prisma.patient.findFirst({
      where: { name },
    });
    if (patientWithTheSameName) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        msg: "Patient already exist",
      });
      return;
    }
    const id = await createPatientId();
    const newPatient = await prisma.patient.create({
      data: {
        id,
        name,
        age,
        gander,
        phoneNumber: phoneNumber || "",
      },
    });
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Patient has been created",
      data: newPatient,
    });
  } catch (error) {
    console.log(error);

    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Something went wrong",
      error,
    });
  }
};

export const deletePatient = async (req: DeletePatientReq, res: Response) => {
  const { workerId, patientIds } = req.body;
  try {
    const worker = await prisma.worker.findFirst({ where: { id: workerId } });
    const IsWorkerAllowed = worker?.role === "ADMIN" ? true : false;
    if (!IsWorkerAllowed) {
      res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        msg: "Something went wrong",
      });
      return;
    }
    await prisma.patient.deleteMany({
      where: {
        id: {
          in: patientIds,
        },
      },
    });
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "patient/s deleted",
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Something went wrong",
      error,
    });
  }
};

export const getPatient = async (req: GetPatientReq, res: Response) => {
  const { id } = req.params;
  try {
    const patient = await prisma.patient.findFirst({
      where: {
        id,
      },
      include: {},
    });
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "",
      data: patient,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Something went wrong",
      error,
    });
  }
};

export const getPatients = async (req: GetPatientsReq, res: Response) => {
  const { skip, take } = req.query;
  try {
    const patients = await prisma.patient.findMany({
      take: Number(take) || 100,
      skip: Number(skip) || 0,
    });
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "",
      data: patients,
    });
  } catch (error) {
    console.log(error);

    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Something went wrong",
      error,
    });
  }
};
