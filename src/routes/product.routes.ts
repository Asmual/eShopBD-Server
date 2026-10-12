import { Router } from "express";
import { getProducts, getProductBySlug } from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

export const productRoutes = router;
