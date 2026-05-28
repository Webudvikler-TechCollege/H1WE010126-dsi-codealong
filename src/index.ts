import express from 'express'
import type { Request, Response } from 'express'
import { carRoutes } from './routes/carRoutes.js'

// Opretter express objekt
const app = express()
// Sætter port
const port = 4000

// Route til root
app.get("/", (req: Request, res: Response) => {
    res.send('Kalder homepage')
})

// Anvender opdelte routes
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