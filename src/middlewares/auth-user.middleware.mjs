import { verifyToken } from "../helpers/jwt.helper.mjs";

const authUser = (req, res, next) => {
  const token = req.header('X-Token'); // Extraemos el token de la cabecera personalizada

  if (!token) {
    console.error('Token no proporcionado en la cabecera X-Token');
    return res.status(401).json({ msg: 'Token no proporcionado' });
  }

  try {
    const payload = verifyToken(token); // Verificamos el token con tu helper

    // Eliminamos campos que no necesitas
    delete payload.iat;
    delete payload.exp;

    // Adjuntamos el payload al objeto request
    req.authUser = {
      userId: payload.userId, // ← Aquí tienes el userId disponible
      email: payload.email     // Puedes incluir otros campos si los firmaste en el token
    };

    console.log('Usuario autenticado:', req.authUser);
    next();
  } catch (err) {
    console.error('Error al verificar el token:', err.message);
    return res.status(403).json({ msg: 'Token inválido o expirado' });
  }
};

export { authUser };
