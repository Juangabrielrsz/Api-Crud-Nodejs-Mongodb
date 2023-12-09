import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import databaseConnection from "../utils/database";

dotenv.config();

export const loginUser = async (email, password) => {
  try {
    console.log("Tentativa de Login com Email:", email, "e Senha:", password);

    await databaseConnection();
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email inválido");
    }
    const validacaoPassword = await bcrypt.compare(password, user.password);
    if (!validacaoPassword) {
      throw new Error("Senha inválida");
    }

    return { msg: "Login bem-sucedido" };
  } catch (error) {
    console.error("Erro durante o login:", error);
    throw error;
  }
};
