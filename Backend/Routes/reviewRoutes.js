import express from "express"
import { ensureUserAuthenticated } from "../Middlewares/ensureAuthenticated.js";
import validateReview from "../Middlewares/validateReviews.js";
import { addReviews, deleteReviews, getReviews } from "../Controller/reviewController.js";
const router = express.Router()

router.get("/:productId",getReviews);
router.post("/",validateReview,ensureUserAuthenticated,addReviews)
router.delete("/",ensureUserAuthenticated,deleteReviews)


export default router