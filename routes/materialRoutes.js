const express = require("express");
const {getAllMaterials, getMaterialById, createMaterial, updateMaterial, deleteMaterial} = require("../controller/materialController")
const {tokenMiddleware, isAdmin} = require("../middleware/authMiddleware")

const router = express.Router();

router.get("/get-material", getAllMaterials);
router.get("/get-material/:id", getMaterialById)
router.post("/create-material", tokenMiddleware, isAdmin, createMaterial)
router.put("/update-material/:id",tokenMiddleware, isAdmin, updateMaterial)
router.delete("/delete-material/:id",tokenMiddleware, isAdmin, deleteMaterial)

module.exports = router;
