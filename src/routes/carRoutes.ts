import { Router } from "express";
import type { Request, Response } from "express";
const router = Router()

// Route til liste af biler - base route i index.ts er /cars
router.get("/", (req: Request, res: Response) => {
    res.send('Her skal vises en liste af biler')
})

// Dynamisk routes - sæt kolon foran parametre og hent dem i req.params
router.get("/:type/:carId", (req: Request, res: Response) => {
    const { carId, type } = req.params
    res.send(`Her skal vises detaljer for bil med id ${carId} og typen ${type}`)
})

export const carRoutes = router