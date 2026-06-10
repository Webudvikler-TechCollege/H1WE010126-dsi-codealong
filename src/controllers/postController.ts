import { Request, Response } from "express";
import { prisma } from "../prisma.js";

class PostController {
    getRecords = async (req: Request, res: Response) => {
        try {
            const data = await prisma.post.findMany({
                include: {
                    userRel: true
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
            const data = await prisma.post.findUnique({
                select: {
                    id: true,
                    title: true,
                    isActive: true,
                    daCreated: true
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

        const { title, content, isActive } = req.body;

        if (!title || !content) {
            console.error('Title og content må ikke være tomme')
        }

        try {
            const data = await prisma.post.create({
                data: {
                    title: title,
                    content: content,
                    isActive: Boolean(isActive)
                }
            })

            return res.status(201).json(data)
        } catch(error) {
           console.error(`Kan ikke oprette post: ${error}`)            
        }
        
    }

    updateRecord = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const { title, content, isActive } = req.body

        try {
            const data = await prisma.post.update({
                where: { id },
                data: {
                    title: title,
                    content: content,
                    isActive: Boolean(isActive)
                }
            })
            res.send(data)
        } catch (error) {
            console.error(`Fejl! Kunne ikke opdatere post: ${error}`)
        }
    }

    deleteRecord = async (req: Request, res: Response) => {
        const id = Number(req.params.id)

        try {
            const data = await prisma.post.delete({
                where: { id }
            })
            res.send(data)
        } catch (error) {
            console.error(`Kan ikke slette posten: ${error}`);
            
        }
        
    }

}

export const postController = new PostController