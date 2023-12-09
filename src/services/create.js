import databaseConnection from "../utils/database";
import User from "../models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const saltRounds = 12;
export const createUser = async (user) => {
  try {
    if (!user.email || !user.password) {
      throw new Error("Email e senha são campos obrigatórios");
    }

    const userExists = await User.findOne({ email: user.email });

    // Se o usuário existir, retorna uma mensagem de erro
    if (userExists) {
      return "email já utilizado";
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(user.password, salt);
    user.password = passwordHash;

    console.log("Criando usuário com os seguintes dados:", user);

    console.log("Usuário criado com sucesso:", createUser);

    return createUser;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};
