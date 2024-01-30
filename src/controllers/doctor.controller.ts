import { StatusCodes } from "http-status-codes";
import { CreateDoctorReq } from "../types/doctor.type";
import { Response } from "express";
import { prisma } from "../utils/prisma";

export const createDoctor = async (req: CreateDoctorReq, res: Response) => {
  const { name, password, phoneNumber, appointmentPrice } = req.body;
  // FIXME: add password hashing and default password

  try {
    const doctorWithTheSameName = await prisma.doctor.findFirst({
      where: { name },
    });
    if (doctorWithTheSameName) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        msg: "Doctor name should be unique",
      });
      return;
    }
    const doctor = await prisma.doctor.create({
      data: {
        name,
        phoneNumber,
        password: "12345",
        appointmentPrice,
      },
    });
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
