import { pool } from "../db.js";

export const cuentaGet = async function (req, res) {
  const [we] = await pool.query(
    "SELECT cuentas.monto, cuentas.idCuenta, cliente.nombre, cliente.primerApellido, cliente.segundoApellido FROM cuentas INNER JOIN cliente ON cuentas.idCliente = cliente.idCliente"
  );
  res.send(we);
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
  const [er] = await pool.query(
    "select correoElectronico  from cliente where correoElectronico=?",
    [correoElectronico]
  );

  if (er.length <= 0) {
    await pool.query(
      "INSERT INTO cliente ( nombre, primerApellido, segundoApellido, fechaNacimiento, celular, cedula, correoElectronico) VALUES (?,?,?,?,?,?,?);",
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

    const [a] = await pool.query(
      "SELECT idCliente FROM cliente where correoElectronico=?",
      [correoElectronico]
    );

    let mapIdUsers = a.map((registro) => registro.idCliente);
    let id = mapIdUsers[0];
    console.log(id);

    await pool.query(
      "INSERT INTO login (correo,password,idCliente,estadoCliente) VALUES(?,?,?,?)",
      [correoElectronico, cedula, id, 1]
    );

    await pool.query(
      "INSERT INTO tarjetas (nombreTitular,idCliente) VALUES(?,?)",
      [nombre, id]
    );

    const [b] = await pool.query(
      "SELECT id  FROM tarjetas where idCliente =?",
      [id]
    );

    let idTarjet = b.map((registro) => registro.id);
    let idTarjeta = idTarjet[0];
    console.log(idTarjeta);

    await pool.query(
      "INSERT INTO cuentas (monto,idCliente,idTarjeta) VALUES(?,?,?)",
      [200, id, idTarjeta]
    );

    res.send("d");
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
