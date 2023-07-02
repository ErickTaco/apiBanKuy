import { Router } from "express";
import {
  cuentaGet,
  historialTransferreciasCliente,
  login,
  registroUsuario,
  transferecniasPost,
  verificarCuentaGet,
} from "../controllers/cuentas.controller.js";

const router = Router();
router.get("/login/:correo/:password", login);
router.get("/cuentas/:idCliente", cuentaGet);

router.put("/cuentas", transferecniasPost);
router.get("/transacciones/:idCliente/:tipo", historialTransferreciasCliente);

router.post("/cuentas", registroUsuario);
router.get("/verificarCuenta/:id", verificarCuentaGet);

export default router;
