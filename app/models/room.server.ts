import type { Room } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Room } from "@prisma/client";

export function getRoom({ id }: Pick<Room, "id">) {
  return prisma.room.findFirst({
    select: { id: true, name: true },
    where: { id },
  });
}

export function getRoomListItems() {
  return prisma.room.findMany({
    select: { id: true, name: true },
    orderBy: { createdAt: "desc" },
  });
}

export function createRoom({ name }: Pick<Room, "name">) {
  return prisma.room.create({
    data: {
      name,
    },
  });
}

export function deleteRoom({ id }: Pick<Room, "id">) {
  return prisma.room.deleteMany({
    where: { id },
  });
}
