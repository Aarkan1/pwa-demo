import { Router } from "express";
import { getHeroes, getHeroById, searchHeroByName } from "../database/db.js";

const router = Router();

router.get("/heroes", (req, res) => {
    const { page = 0, limit } = req.query;
    res.json(getHeroes(+page, limit ? +limit : 30));
});

router.get("/heroes/:id", (req, res) => {
    const { id } = req.params;
    res.json(getHeroById(+id));
});

router.get("/heroes/search/:name", (req, res) => {
    const { name } = req.params;
    res.json(searchHeroByName(name));
});

export default router;
