const { User } = require('./user');
const knex = require('../db/db_repository');
const passwordFunc = require('../auth/password');

jest.mock('../db/db_repository');
jest.mock('../auth/password');

describe('User Class', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create_user', () => {
    it('should create a user', async () => {
      const mockUser = {
        id: 1,
        email: 'admin@admin.com',
        password: 'hashedPassword',
      };

      passwordFunc.hash_password.mockReturnValueOnce('hashedPassword');

      knex.mockReturnValueOnce({
        insert: jest.fn().mockReturnValueOnce([mockUser.id])
      });

      const result = await User.create_user({
        email: 'admin@admin.com',
        password: 'plainPassword',
      });

      expect(passwordFunc.hash_password).toHaveBeenCalledWith('plainPassword');

      expect(knex).toHaveBeenCalledWith('users');

      expect(result).toEqual({ message: 'created' });
    });
  });
});

