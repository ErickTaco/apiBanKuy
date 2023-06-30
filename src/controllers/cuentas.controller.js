import { pool } from "../db.js";

export const login = async function (req, res) {
  const correo = req.params.correo;
  const password = req.params.password;
  const [login] = await pool.query(
    "SELECT idCliente,estadoCliente FROM login WHERE correo=? AND password=?",
    [correo, password]
  );

  let idCliente = login.map((registro) => registro.idCliente);
  let idClientee = idCliente[0];
  console.log(idClientee);
  res.send(idClientee);
};

export const cuentaGet = async function (req, res) {
  const correo = req.params.correo;
  const password = req.params.password;
  const [login] = await pool.query(
    "SELECT idCliente,estadoCliente FROM login WHERE correo=? AND password=?",
    [correo, password]
  );

  let idCliente = login.map((registro) => registro.idCliente);
  let idClientee = idCliente[0];
  console.log(idClientee);

  let estadoCliente = login.map((registro) => registro.estadoCliente);
  let estadoClientee = estadoCliente[0];
  console.log(estadoClientee);

  if (estadoClientee == 0) {
    return res.send();
  } else {
    const [we] = await pool.query(
      "SELECT cuentas.monto, cuentas.idCuenta, cliente.nombre, cliente.primerApellido, cliente.segundoApellido FROM cuentas INNER JOIN cliente ON cuentas.idCliente = cliente.idCliente WHERE cliente.idCliente=?",
      [idClientee]
    );
    res.send(we);
  }
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

export const verificarCuentaGet = async function (req, res) {
  const id = req.params.id;
  const [ro] = await pool.query(
    `SELECT cliente.nombre, cliente.primerApellido, cliente.segundoApellido FROM cuentas INNER JOIN cliente ON cuentas.idCliente = cliente.idCliente WHERE idCuenta=?`,
    [id]
  );

  res.send(ro);
};

export const transferecniasPost = async function (req, res) {
  const { cuentaOrigen, monto, cuentaDestino } = req.body;

  const [rows] = await pool.query(
    `SELECT monto FROM cuentas where idCuenta=?`,
    [cuentaOrigen]
  );

  await pool.query(`UPDATE cuentas SET monto= monto-? WHERE idCuenta = ? `, [
    monto,
    cuentaOrigen,
  ]);

  await pool.query(`UPDATE cuentas SET monto = monto +? WHERE idCuentas =?;`, [
    monto,
    cuentaDestino,
  ]);
  res.send("ecitoso");
};
