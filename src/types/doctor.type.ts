import { Prisma } from "@prisma/client";
import { Request } from "express";

export interface CreateDoctorReq extends Request {
  body: Prisma.DoctorCreateInput;
}
