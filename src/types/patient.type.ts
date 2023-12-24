import { Prisma } from "@prisma/client";
import { Request } from "express";

export interface CreatePatientReq extends Request {
  body: Prisma.PatientCreateInput;
}
export interface DeletePatientReq extends Request {
  body: {
    workerId: string;
    patientIds: string[];
  };
}
export interface GetPatientReq extends Request {
  params: { id: string };
}
export interface GetPatientsReq extends Request {
  query: {
    take: string;
    skip: string;
  };
}
