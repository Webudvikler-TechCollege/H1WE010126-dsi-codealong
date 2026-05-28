import express from 'express'
import type { Request, Response } from 'express'
const app = express()
const port = 4000


app.get("/", (req: Request, res: Response) => {
    res.send('Kalder homepage')
})

app.get("/test/:id", (req: Request, res: Response) => {
    const { id } = req.params
    res.send(`Kalder testside: ${id}`)
})

app.use((req: Request, res:Response) => {
    res.send({
        message: '404 - Bad request'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);  
})