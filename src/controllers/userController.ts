import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import bcrypt from 'bcrypt'

class UserController {
    getRecords = async (req: Request, res: Response) => {
        try {
            const data = await prisma.user.findMany({
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true
                }
            })
            return res.json(data);

        } catch (error) {
            console.error(`Fejl i API kald: ${error}`)
        }
    }

    getRecord = async (req: Request, res: Response) => {
        const { id } = req.params
        
        try {
            const data = await prisma.user.findUnique({
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    role: true,
                    isActive: true
                },
                where: {
                    id: Number(id)
                }
            })
            res.send(data);
            
        } catch (error) {
            console.error(`Kunne ikke hente data: ${error}`)
        }   
    }

    createRecord = async (req: Request, res: Response) => {

        const { firstname, lastname, email, password, role, isActive } = req.body;

        if (!firstname || !lastname || !email || !password) {
            console.error('Title og content må ikke være tomme')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        try {
            const data = await prisma.user.create({
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: hashedPassword,
                    role: role,
                    isActive: Boolean(JSON.parse(isActive))
                }
            })

            return res.status(201).json(data)
        } catch(error) {
           console.error(`Kan ikke oprette bruger: ${error}`)            
        }
        
    }

    updateRecord = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const { firstname, lastname, email, password, role, isActive } = req.body

        try {
            const data = await prisma.user.update({
                where: { id },
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                    role: role,
                    isActive: Boolean(JSON.parse(isActive))
                }
            })
            res.send(data)
        } catch (error) {
            console.error(`Fejl! Kunne ikke opdatere bruger: ${error}`)
        }
    }

    deleteRecord = async (req: Request, res: Response) => {
        const id = Number(req.params.id)

        try {
            const data = await prisma.user.delete({
                where: { id }
            })
            res.send(data)
        } catch (error) {
            console.error(`Kan ikke slette brugeren: ${error}`);
            
        }
        
    }

}

export const userController = new UserController