import React, { useState, useEffect } from "react";
import "./MoviePage.css";
import { useParams } from "react-router-dom";
import MovieApiService from "../../services/movieApi.service";
import Layout from "../Layout/Layout";
import StreamingService from "../../services/streaming.service";
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';

const MoviePage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const [selectedStreaming, setSelectedStreaming] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await MovieApiService.getMovie(movieId);
      console.log(movieData);
      setMovie(movieData);
    };

    fetchMovie();
  }, [movieId]);

  const goToRent = (streaming) => {
    setSelectedStreaming(streaming);
    new bootstrap.Modal(document.getElementById('modalSelect')).show();
    // window.location.href = "/rent/" + movieId + "/" + streamingId;
  }

  $(document).ready(function(){
    $('#buttonsPay .btn').on('click', function () {
      console.log('clicou');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        new bootstrap.Collapse(document.querySelectorAll('.collapse')[0]).toggle();
        $('#buttonsPay .btn').prop("disabled", true);
      }, 3000);
    });
  });

  return (
    <div className="movie-page">
      {movie === null ? (
        <p>Carregando...</p>
      ) : (
        <Layout>
          <div className="movie-details">
            <div className="container p-5">
              <div className="row">
                <div className="col">
                  <img src={movie.image} alt={movie.title} />
                </div>
                <div className="col">
                  <h1>{movie.title}</h1>
                  <hr />
                  <p>
                    <strong>Ano:</strong> {movie.year}
                  </p>
                  <p>
                    <strong>Duração:</strong> {movie.duration} minutos
                  </p>
                  <p>
                    <strong>Elenco:</strong> {movie.casting}
                  </p>
                  <p>{movie.description}</p>
                  <p>Alugue esse filme nas seguintes plataformas:</p>

                  <div className="row">
                    {
                      movie.streamings.map((streaming, idx) => (
                          <div className="col-sm-2 text-center" style={{height: '140px'}} key={idx}>
                            <a target="_blank" rel="noreferrer">
                              <img width={35} src={StreamingService.getStreamingIcon(streaming.source)} alt={streaming.source} />
                              {streaming.source}<br />
                              {streaming.price == 0 ? 'Grátis' : 'R$ ' + String(streaming.price.toFixed(2)).replace('.',',')}
                              <button onClick={() => goToRent(streaming)}>Alugar</button>
                            </a> 
                          </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="modalSelect">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                {
                  selectedStreaming !== null ?
                  <div className="modal-body">
                    <h5>Alugar</h5>
                    <p>Preço: R$ {String(selectedStreaming.price.toFixed(2)).replace('.',',')}</p>
                    <p>Plataforma: {selectedStreaming.source}</p>

                    {
                      selectedStreaming.price > 0 ?
                      <>
                      <p>Selecione a forma de pagamento</p>
                      <div className="row text-center" id="buttonsPay">
                        <div className="col-sm-5 d-grid">
                          <button className="btn btn-info" type="button">
                            Cartão de crédito
                            <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                              <path d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z"/>
                            </svg>
                          </button>
                        </div>
                        <div className="col d-grid">
                          <button className="btn btn-info" type="button">
                            Boleto
                            <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                              <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5 .1 0 0 0 0c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16V422.2c-11.2-2.1-21.7-5.7-30.9-8.9l0 0 0 0c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5 .8 4.8 1.6 7.1 2.4l0 0 0 0 0 0c13.6 4.6 24.6 8.4 36.3 8.7c9.1 .3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5 0 0c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7V232c0-8.8 7.2-16 16-16z"/>
                            </svg>
                          </button>
                        </div>
                        <div className="col d-grid">
                          <button className="btn btn-info" type="button">
                            PIX
                            <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                              <path d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.1 231.1 518.1 200.8 488.6L103.3 391.2H112.6C132.6 391.2 151.5 383.4 165.7 369.2L242.4 292.5zM262.5 218.9C256.1 224.4 247.9 224.5 242.4 218.9L165.7 142.2C151.5 127.1 132.6 120.2 112.6 120.2H103.3L200.7 22.8C231.1-7.6 280.3-7.6 310.6 22.8L407.8 119.9H392.6C372.6 119.9 353.7 127.7 339.5 141.9L262.5 218.9zM112.6 142.7C126.4 142.7 139.1 148.3 149.7 158.1L226.4 234.8C233.6 241.1 243 245.6 252.5 245.6C261.9 245.6 271.3 241.1 278.5 234.8L355.5 157.8C365.3 148.1 378.8 142.5 392.6 142.5H430.3L488.6 200.8C518.9 231.1 518.9 280.3 488.6 310.6L430.3 368.9H392.6C378.8 368.9 365.3 363.3 355.5 353.5L278.5 276.5C264.6 262.6 240.3 262.6 226.4 276.6L149.7 353.2C139.1 363 126.4 368.6 112.6 368.6H80.8L22.8 310.6C-7.6 280.3-7.6 231.1 22.8 200.8L80.8 142.7H112.6z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      {
                        loading ?
                        <>
                          <div className="d-grid mt-3">
                            <div className="spinner-border mx-auto">
                              <span className="visually-hidden">Carregando</span>
                            </div>
                          </div>
                        </>
                        :
                        <></>
                      }
                      <div className="collapse my-3" id="collapseExample">
                          <h4 className="h4">O pagamento foi aprovado com sucesso!</h4>

                          <div className="d-grid">
                            <a href={selectedStreaming.link} target="_blank" className="btn btn-secondary">Clique aqui para acessar</a>
                          </div>
                      </div>
                      </>
                      :
                      <>
                        <div className="d-grid">
                          <a className="btn btn-secondary" href={selectedStreaming.link} target="_blank">Ir para o site</a>
                        </div>
                      </>
                    }
                    
                  </div>
                  :
                  <></>
                }
              </div>
            </div>
          </div>
          </Layout>
      )}
    </div>
  );
};

export default MoviePage;
