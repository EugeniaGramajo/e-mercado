import prisma from '@/config/prisma-client.config';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
const saltRounds = 10;
export class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Faltaron campos a rellenar" })
      }
      const regexUserName = /^[a-zA-Z0-9]+$/
      const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const regexPassword = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;
      if (!regexUserName.test(username)) {
        return res.status(400).json({ error: "usuario no valido,no cumple con los requisitos" })
      }
      if (!regexEmail.test(email)) {
        return res.status(400).json({ error: "Email no valido,no cumple con los requisitos" })
      }
      
      const usernameExist = await prisma.user.findUnique({where:{username:username.toLowerCase()}})
      const emailExist = await prisma.user.findUnique({where:{email}})
      if(emailExist){
        return res.status(400).json({error:"Esta cuenta de Email ya esta en uso"})
      }
      if(usernameExist){
        return res.status(400).json({error:"Este cuenta de Usuario ya esta en uso"});
        }
        if(!regexPassword.test(password)){
          return res.status(400).json({error:"contraseña no valida,no cumple con los requisitos"})
        }
        const hashedPassword = await bcrypt.hash(password,saltRounds)
      const newUser = await prisma.user.create({
        data: {
          username:username.toLowerCase(),
          email,
          password:hashedPassword
        }
      })
      res.send({ newUser, message: "Usuario Creado Con Exito" })
    } catch (error) {
      res.status(400).json({error, message: "volo con su rasho lase" })
    }


  }
  async loginUser(req:Request,res:Response){
    /* const passwordMatches = await bcrypt.compare(password, user.password);

if (passwordMatches) {
  // Contraseña correcta, inicio de sesión exitoso
  res.status(200).json({ message: 'Inicio de sesión exitoso' });
} else {
  // Contraseña incorrecta, inicio de sesión fallido
  res.status(401).json({ error: 'Credenciales incorrectas' });
} */
  }
}
