import { StatusCodes } from "http-status-codes";
import { CreateDoctorReq } from "../types/doctor.type";
import { Response } from "express";
import { prisma } from "../utils/prisma";

export const createDoctor = async (req: CreateDoctorReq, res: Response) => {
  const { name, password, phoneNumber, appointmentPrice } = req.body;
  const doctor = await prisma.doctor.create({
    data: {
      name,
      phoneNumber,
      password: "12345",
      appointmentPrice,
    },
  });
  try {
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Doctor created",
      data: "",
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Something went wrong",
      error,
    });
  }
};
