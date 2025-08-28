const mongoose = require('mongoose');
const User = require('./User.model'); // importa tu modelo

describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('Debería crear un usuario válido', async () => {
    const validUser = new User({
      name: 'Mateo Silva',
      email: 'mateo@example.com',
      documentType: 'cc',
      documentNumber: '123456789',
      password: 'password123'
    });

    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe('mateo@example.com');
  });

  it('Debería fallar si falta un campo requerido (name)', async () => {
    const user = new User({
      email: 'mateo@example.com',
      documentType: 'cc',
      documentNumber: '123456789',
      password: 'password123'
    });

    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });

  it('Debería fallar si el email no es válido', async () => {
    const user = new User({
      name: 'Mateo',
      email: 'correo_invalido',
      documentType: 'cc',
      documentNumber: '123456789',
      password: 'password123'
    });

    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
    expect(err.errors.email.message).toBe('Por favor ingresa un correo válido');
  });

  it('Debería fallar si la contraseña es menor a 8 caracteres', async () => {
    const user = new User({
      name: 'Mateo',
      email: 'mateo@example.com',
      documentType: 'cc',
      documentNumber: '123456789',
      password: '123'
    });

    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined();
    expect(err.errors.password.message).toBe('La contraseña debe tener mínimo 8 caracteres');
  });
});
