import { Router } from "express";
import {
  actulizarInformacion,
  cuentaGet,
  historialTransferreciasCliente,
  login,
  pagoServicio,
  perfil,
  registroUsuario,
  serviciosBasicos,
  transaccionesInterbancarias,
  transferecniasPost,
  verificarCuentaGet,
} from "../controllers/cuentas.controller.js";

const router = Router();
router.get("/login/:correo/:password", login);
router.get("/cuentas/:idCliente", cuentaGet);

router.put("/cuentas", transferecniasPost);
router.put("/cuentas2", transaccionesInterbancarias);
router.put("/actulizarDatos/:idCliente", actulizarInformacion);

router.get("/transacciones/:idCliente/:tipo", historialTransferreciasCliente);
router.get("/serviciosBasicos/:Cedula", serviciosBasicos);
router.put("/pagoServicios", pagoServicio);

router.post("/cuentas", registroUsuario);
router.get("/verificarCuenta/:id", verificarCuentaGet);
router.get("/perfil/:idCliente", perfil);

export default router;
