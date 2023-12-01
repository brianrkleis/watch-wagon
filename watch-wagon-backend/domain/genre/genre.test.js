const request = require('supertest');
const express = require('express');
const app = express();

// Importando a classe Genre
const { Genre } = require('./genre');

// Mockando o método get_all da classe Genre
jest.mock('./genre', () => ({
  Genre: {
    get_all: jest.fn()
  }
}));

// Importando a rota
const  genreRoute = require('../../routes/genre');

// Configurando a rota no aplicativo Express
app.use('/genres', genreRoute);

describe('Genre Route', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /genres', () => {
    it('should retrieve all genres', async () => {
      const mockGenres = [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Drama' },
        // ... other mock genres
      ];

      // Mockando a implementação do método get_all
      Genre.get_all.mockResolvedValueOnce(mockGenres);

      // Fazendo uma requisição GET para a rota /genres
      const response = await request(app).get('/genres');

      // Verificando se a resposta está correta
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockGenres);

      // Verificando se o método get_all foi chamado
      expect(Genre.get_all).toHaveBeenCalledTimes(1);
    });
  });

  // Adicione outros testes conforme necessário
});
