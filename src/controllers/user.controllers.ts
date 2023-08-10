import prisma from "@/config/prisma-client.config";
import { Request, Response } from "express";

export class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const regexUsername = /^[a-zA-Z0-9]+$/;
      const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!username || !email || !password) {
        return res.status(400).json({error:"Faltan datos"});
      }
      if (!regexUsername.test(username)) {
        return res.status(400).json({error:"No puede contener simbolos"});
      }
      if (!regexEmail.test(email)) {
        return res.status(400).json({error:"El email no tiene un formato valido"});
      }
      const usernameExist = await prisma.user.findUnique({ where: { username: username.toLowerCase() }});
      const emailExist = await prisma.user.findUnique({ where: { email } });
      if (usernameExist) {
        return res.status(400).json({error:"El username ya ha sido utilizado"});
      }
      if (emailExist) {
        return res.status(400).json({error:"El email ya ha sido utilizado"});
      }
      const newUser = await prisma.user.create({
        data: {
          username: username.toLowerCase(),
          email,
          password,
        },
      });
      res.send({newUser, message: "Usuario creado exitosamente"});
    } catch (error) {
      res.status(400).json({error, message: "Ha ocurrido un error"});
    }
  }
}
