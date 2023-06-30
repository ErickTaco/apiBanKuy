import { Router } from "express";
import {
  cuentaGet,
  login,
  registroUsuario,
  transferecniasPost,
  verificarCuentaGet,
} from "../controllers/cuentas.controller.js";

const router = Router();
router.get("/login/:correo/:password", login);
router.get("/cuentas/:idCliente", cuentaGet);

router.patch("/cuentas", transferecniasPost);
router.post("/cuentas", registroUsuario);
router.get("/verificarCuenta/:id", verificarCuentaGet);

export default router;
