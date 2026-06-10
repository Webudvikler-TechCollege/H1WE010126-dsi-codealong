import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../prisma.js";

class AuthController {

    // Method generateToken
    generateToken = (
        user: { id: number },
        type: "access" | "refresh"
    ) => {
        const key = process.env[`TOKEN_${type.toUpperCase()}_KEY`]
        const expiresIn = process.env[`TOKEN_${type.toUpperCase()}_EXPIRATION_SECS`]

        if(!key || !expiresIn) {
            throw new Error(`Missing env var for ${type} token`)
        }

        const exp = Math.floor(Date.now() / 1000) + Number(expiresIn)

        return jwt.sign({
            exp,
            data: {
                id: user.id
            }
        }, key) 

    }


    authenticate = async (req: Request, res: Response) => {
        const { username, password } = req.body
        
        if(!username || !password) {
            return res.status(400).json({
                message: "Missing credentials"
            })
        }

        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: username,
                    isActive: true
                },
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    password: true
                }
            })

            if(!user) {
                return res.sendStatus(401)
            }

            const isMatch = await bcrypt.compare(
                password,
                user.password
            )

            if(!isMatch) {
                return res.sendStatus(401)
            }

            const access_token = this.generateToken(user, "access")

            return res.json({
                access_token,
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }
            })
        } catch (error: any) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
}

export const authController = new AuthController