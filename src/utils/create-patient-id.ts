import { prisma } from "./prisma";

export const createPatientId = async () => {
  try {
    const counter = await prisma.patientCounter.findFirst();
    if (!counter) {
      const c = await prisma.patientCounter.create({
        data: {
          value: 1,
        },
      });
      const customId = `PID${c.value.toString().padStart(4, "0")}`;
      return customId;
    }
    if (counter) {
      const nextValue = counter.value + 1;
      // Format the ID with leading zeros
      const customId = `PID${nextValue.toString().padStart(4, "0")}`;

      // Increment the counter value in the database
      await prisma.patientCounter.update({
        where: { id: counter.id },
        data: { value: nextValue },
      });

      return customId;
    }

    // Use customId when creating a new record
  } catch (error) {
    console.log(error);
  }
};
