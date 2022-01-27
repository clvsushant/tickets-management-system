const { sign } = require('./jwt');
const { User } = require('../database');
const { hashPassword, matchPassword } = require('./password');
const { createUserSchema, loginUserSchema } = require('./validation');

const sanitizeFields = async (user) => {
  if (user.password) delete user.password;
  if (user.token) delete user.token;
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
  user.token = await sign(user);
  await user.save();
  return user.token;
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
  existing.token = await sign(existing);
  await existing.save();
  return existing.token;
};

exports.getUserByEmail = async (userEmail) => {
  const user = await User.findOne({ where: { email: userEmail } });
  if (!user) throw new Error('No user with this email');
  return sanitizeFields(user.dataValues);
};
