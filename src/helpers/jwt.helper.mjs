import jwt from 'jsonwebtoken';

/**
 * Genera un token JWT incluyendo el userId y otros datos opcionales
 * @param {Object} user - Objeto con datos del usuario (debe incluir userId)
 * @returns {string} token firmado
 */
const generateToken = (user) => {
  const payload = {
    userId: user._id || user.id, // ← Asegúrate de que el campo venga del modelo
    email: user.email,           // Puedes incluir otros datos si lo necesitas
    role: user.role              // Opcional: útil si manejas roles como 'admin'
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });
  return token;
};

/**
 * Verifica el token y retorna el payload decodificado
 * @param {string} token - Token JWT recibido desde el frontend
 * @returns {Object} payload con userId, email, etc.
 */
const verifyToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload; // Incluye userId si fue firmado correctamente
};

export { generateToken, verifyToken };
