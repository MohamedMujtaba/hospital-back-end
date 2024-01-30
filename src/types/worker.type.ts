import { Prisma } from "@prisma/client";
import { Request } from "express";

export interface RegisterWorkerReq extends Request {
  body: Prisma.WorkerCreateInput;
}
export interface LoginWorkerReq extends Request {
  body: { phoneNumber: string; password: string };
}
