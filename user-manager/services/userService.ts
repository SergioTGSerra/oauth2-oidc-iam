"use server"
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export interface UserData {
  username: string;
  email: string;
  password: string;
  authorities: string;
}

export async function createUser(data: UserData) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const newUser = await prisma.users.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        authorities: data.authorities,
      },
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: (error as Error).message };
  }
}

export async function getUsers() {
  try {
    const users = await prisma.users.findMany();
    return { success: true, users };
  } catch (error) {
    console.error("Error getting users:", error);
    return { success: false, message: (error as Error).message };
  }
}

export async function getUserById(id: number) {
  try {
    const user = await prisma.users.findUnique({ where: { id } });
    return { success: true, user };
  }
  catch (error) {
    console.error("Error getting user by id:", error);
    return { success: false, message: (error as Error).message };
  }
}

export async function updateUser(id: number, data: any) {
  try {

    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        username: data.username,
        email: data.email,
        authorities: data.authorities,
      },
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: (error as Error).message };
  }
}


export async function deleteUser(id: number) {
  try {
    await prisma.users.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: (error as Error).message };
  }
}


