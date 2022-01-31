const { User } = require('../database');
const { createUserSchema, loginUserSchema } = require('./validation');
const { hashPassword, matchPassword } = require('../utils/password');
const { sign } = require('../utils/jwt');

const sanitizeFields = async (user) => {
  if (user.password) delete user.password;
  return user;
};

exports.createUser = async (userPayload) => {
  await createUserSchema.validateAsync(userPayload);
  const existing = await User.findOne({ where: { email: userPayload.email } });
  if (existing) throw new Error('User with this email already exists');
  const user = await User.create({
    email: userPayload.email,
    password: await hashPassword(userPayload.password),
    name: userPayload.name,
  });
  const token = await sign(user);
  return token;
};

exports.loginUser = async (userPayload) => {
  await loginUserSchema.validateAsync(userPayload);
  const existing = await User.findOne({ where: { email: userPayload.email } });
  if (!existing) throw new Error('No user with this email found');
  const passMatch = await matchPassword(
    existing.password,
    userPayload.password
  );
  if (passMatch === false) throw new Error('wrong password');

  const token = await sign(await sanitizeFields(existing.dataValues));
  return token;
};

exports.getUserById = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('No user with this email');
  return sanitizeFields(user.dataValues);
};
