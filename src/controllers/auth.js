import * as AuthService from '../services/auth.js';

export const registerUser = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const [registeredUser, session] = await AuthService.registerUser(user);

  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      user: registeredUser,
      accessToken: session.accessToken,
    },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const [maybeUser, session] = await AuthService.loginUser(email, password);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      user: maybeUser,
      accessToken: session.accessToken,
    },
  });
};

export const refreshUserSession = async (req, res) => {
  const session = await AuthService.refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUser = async (req, res) => {
  if (req.cookies.sessionId) {
    await AuthService.logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).end();
};

export const sendResetEmail = async (req, res) => {
  await AuthService.sendResetEmail(req.body.email);

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPwd = async (req, res) => {
  const { password, token } = req.body;

  await AuthService.resetPwd(password, token);

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};

// -----------------------------------------------

function setupSession(res, session) {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
}
