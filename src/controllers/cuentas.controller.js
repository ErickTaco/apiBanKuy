import { pool } from "../db.js";

export const cuentaGet = async function (req, res) {
  const [rows] = await pool.query(
    "SELECT cuentas.monto, cuentas.idCuenta, cliente.nombre, cliente.primerApellido, cliente.segundoApellido FROM cuentas INNER JOIN cliente ON cuentas.idCliente = cliente.idCliente"
  );
  res.send(rows);
};

export const registroUsuario = async function (req, res) {
  const {
    nombre,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    celular,
    cedula,
    correoElectronico,
  } = req.body;

  const [rows] = await pool.query(
    "select correoElectronico   from cliente where correoElectronico=?",
    [correoElectronico]
  );
  if (rows.length <= 0) {
    await pool.query(
      "INSERT INTO cliente ( nombre, primerApellido, segundoApellido, fechaNacimiento, celular, cedula, correoElectronico) VALUES (?,?,?,?,?,?,?)",
      [
        nombre,
        primerApellido,
        segundoApellido,
        fechaNacimiento,
        celular,
        cedula,
        correoElectronico,
      ]
    );
    res.send("ecisotos");
  } else {
    console.log("correo electronico ya registrado");
    res.status(404).json({ mesanje: "correo electronico ya registradonpm" });
  }
};

export const transferecniasPost = async function (req, res) {
  const { cuentaOrigen, monto, cuentaDestino } = req.body;

  const [rows] = await pool.query(`SELECT monto FROM cuentas where id=?`, [
    cuentaOrigen,
  ]);
  await pool.query(`UPDATE cuentas SET monto= monto-? WHERE id = ? `, [
    monto,
    cuentaOrigen,
  ]);

  await pool.query(`UPDATE cuentas SET monto = monto +? WHERE id =?;`, [
    monto,
    cuentaDestino,
  ]);
  res.send("ecitoso");
};
