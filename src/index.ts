import express from 'express'
import type { Request, Response } from 'express'
import { carRoutes } from './routes/carRoutes.js'
import dotenv from 'dotenv'
import { postRoutes } from './routes/postRoutes.js'
dotenv.config()

// Opretter express objekt
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Sætter port
const port = process.env.PORT || 4000

// Route til root
app.get("/", (req: Request, res: Response) => {
    res.send('Kalder homepage')
})

// Anvender opdelte routes
app.use("/posts", postRoutes)
app.use("/cars", carRoutes)

// Route til 404
app.use((req: Request, res:Response) => {
    res.send({
        message: '404 - Bad request'
    })
})

// Kører server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);  
})