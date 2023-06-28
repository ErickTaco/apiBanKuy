import { Router } from "express";
import {
  cuentaGet,
  registroUsuario,
  transferecniasPost,
  verificarCuentaGet,
} from "../controllers/cuentas.controller.js";

const router = Router();
router.get("/cuentas", cuentaGet);
router.patch("/cuentas", transferecniasPost);
router.post("/cuentas", registroUsuario);
router.get("/verificarCuenta", verificarCuentaGet);

export default router;
