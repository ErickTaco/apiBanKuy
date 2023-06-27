import { Router } from "express";
import {
  cuentaGet,
  registroUsuario,
  transferecniasPost,
} from "../controllers/cuentas.controller.js";

const router = Router();
router.get("/cuentas", cuentaGet);
router.patch("/cuentas", transferecniasPost);
router.post("/cuentas", registroUsuario);

export default router;
