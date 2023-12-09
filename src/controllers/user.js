import { Router } from "express";
import { listUsers, deleteUser, updateUser } from "../services/user";
import { createUser } from "../services/create";
import { loginUser } from "../services/login";

const router = Router();

router.get("/", async (req, res) => {
  const userList = await listUsers();
  res.send(userList);
});

router.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).send({ msg: "Usuário criado com sucesso" });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:userId", async (req, res) => {
  await deleteUser(req.params.userId);
  res.send();
});

router.put("/:userId", async (req, res) => {
  await updateUser(req.params.userId, req.body);
  res.send();
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.json({ msg: "Login bem-sucedido" });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(401).json({ msg: "Email ou Senha incorreto" });
  }
});

export default router;
