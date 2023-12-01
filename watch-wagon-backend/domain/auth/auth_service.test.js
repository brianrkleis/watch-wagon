// authService.test.js
const { AuthService } = require('./auth_service');
const passwordFunc = require('./password');
const jwt = require('jsonwebtoken');
const { User } = require('../user/user');

jest.mock('./password');
jest.mock('jsonwebtoken');
jest.mock('../user/user');

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return a token on successful login', async () => {
      User.find_by_email_w_password.mockResolvedValueOnce({ id: 1, password: 'hashedPassword' });
      passwordFunc.compare_password.mockResolvedValueOnce(true);
      jwt.sign.mockReturnValueOnce('mockToken');

      const req = { body: { email: 'admin@admin.com', password: 'admin' } };

      const sendMock = jest.fn();
      const statusMock = jest.fn(() => ({ send: sendMock }));
    
      const res = { status: statusMock, send: sendMock }; 
    
    
      await AuthService.login(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ token: 'mockToken' });
    });

    it('should return an error for incorrect credentials', async () => {
      User.find_by_email_w_password.mockResolvedValueOnce({ id: undefined });

      const req = { body: { email: 'admin@admin.com', password: 'admin' } };
      const sendMock = jest.fn();
      const statusMock = jest.fn(() => ({ send: sendMock }));
      const res = { status: statusMock, send: sendMock };

      await AuthService.login(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith({ error: 'incorrect credentials' });
    });

    it('should return an error for unauthorized login', async () => {
      User.find_by_email_w_password.mockResolvedValueOnce({ id: 1, password: 'hashedPassword' });
      passwordFunc.compare_password.mockResolvedValueOnce(false);

      const req = { body: { email: 'admin@admin.com', password: 'admin' } };
      const sendMock = jest.fn();
      const statusMock = jest.fn(() => ({ send: sendMock }));
      const res = { status: statusMock, send: sendMock };

      await AuthService.login(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
  });

  describe('make_token', () => {
    it('should generate a JWT token', () => {
      jwt.sign.mockReturnValueOnce('mockToken');

      const result = AuthService.make_token(1);

      expect(result).toBe('mockToken');
      expect(jwt.sign).toHaveBeenCalledWith({ user_id: 1, exp: expect.any(Number) }, process.env.JWT_SECRET);
    });
  });

  describe('verify_token', () => {
    it('should verify a JWT token', () => {
      jwt.verify.mockReturnValueOnce({ user_id: 1 });

      const result = AuthService.verify_token('mockToken');

      expect(result).toEqual({ user_id: 1 });
      expect(jwt.verify).toHaveBeenCalledWith('mockToken', process.env.JWT_SECRET);
    });
  });

});
