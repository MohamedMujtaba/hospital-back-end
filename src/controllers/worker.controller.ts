import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { LoginWorkerReq, RegisterWorkerReq } from "../types/worker.type";
import { prisma } from "../utils/prisma";
import { WorkerRole } from "@prisma/client";
import { hashString } from "../utils/createHash";
import { comparePassword } from "../utils/compar-password";
import { attachCookiesToResponse } from "../utils/jwt";
import { randomBytes } from "crypto";

export const register = async (req: RegisterWorkerReq, res: Response) => {
  const { name, password, phoneNumber } = req.body;
  try {
    if (!name || !password || !phoneNumber) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        msg: "Please provide name, phone number and password",
      });
      return;
    }
    const phonNumberAlreadyExists = await prisma.worker.findFirst({
      where: { phoneNumber },
    });
    if (phonNumberAlreadyExists) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        msg: "Phone number already exist ",
      });
      return;
    }
    const isFirstAccount = (await prisma.worker.count()) === 0;
    const role: WorkerRole = isFirstAccount ? "ADMIN" : "REG";
    const verified = isFirstAccount ? true : false;
    const hPassword = await hashString(password);

    const worker = await prisma.worker.create({
      data: {
        name,
        phoneNumber,
        role,
        password: hPassword,
        verified,
      },
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "",
      data: worker,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Something went wrong",
      error,
    });
  }
};

export const login = async (req: LoginWorkerReq, res: Response) => {
  const { phoneNumber, password } = req.body;
  try {
    if (!phoneNumber || !password) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        msg: "Please provide phone number and password",
      });
      return;
    }
    const worker = await prisma.worker.findFirst({ where: { phoneNumber } });
    if (!worker) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        msg: "Invalid Credentials",
      });
      return;
    }

    const isPasswordCorrect = await comparePassword(password, worker.password);

    if (!isPasswordCorrect) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        msg: "Invalid Credentials",
      });
      return;
    }

    if (!worker.verified) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        msg: "Wait for admin verification",
      });
      return;
    }

    const tokenUser = {
      name: worker.name,
      phoneNumber: worker.phoneNumber,
      id: worker.id,
      role: worker.role,
    };

    // create refresh token
    let refreshToken = "";

    // check for existing token
    const existingToken = await prisma.workerToken.findFirst({
      where: { workerId: worker.id },
    });

    if (existingToken) {
      const { isValid } = existingToken;
      if (!isValid) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          msg: "Invalid Credentials",
        });
      }
      refreshToken = existingToken.refreshToken;
      attachCookiesToResponse({ res, user: tokenUser, refreshToken });
      res.status(StatusCodes.OK).json({ worker: tokenUser });
      return;
    }

    refreshToken = randomBytes(40).toString("hex");

    await prisma.workerToken.create({
      data: { refreshToken, workerId: worker.id },
    });

    attachCookiesToResponse({ res, user: tokenUser, refreshToken });

    res.status(StatusCodes.OK).json({ user: tokenUser });

    //  res.status(StatusCodes.OK).json({
    //   success: true,
    //   msg: "",
    //   data: "",
    // });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Something went wrong",
      error,
    });
  }
};
