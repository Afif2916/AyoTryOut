const express = require("express");
const {getAllMaterials, getMaterialById, createMaterial, updateMaterial, deleteMaterial} = require("../controller/materialController")

const router = express.Router();

router.get("/get-material", getAllMaterials);
router.get("/get-material/:id", getMaterialById)
router.post("/create-material", createMaterial)
router.put("/update-material/:id", updateMaterial)
router.delete("/delete-material/:id", deleteMaterial)

module.exports = router;
