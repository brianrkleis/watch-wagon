import { Component } from "react";
import MovieApiService from "../../services/movieApi.service";
import Layout from "../Layout/Layout";

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    async componentDidMount() {
        this.setState({
            user: await MovieApiService.getUser()
        });
    }

    goToMovie(movieId){
        window.location.href='/movie/'+ movieId;
      }

    callSubmit(e){
        e.preventDefault();
        const data = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        MovieApiService.updateUser(data).then((response) => {
            alert('Usuário atualizado com sucesso!');
            window.location.reload();
        });
    }

    // Other methods and render function go here
    render() {
        const user = this.state.user;
        return (
            <Layout>
                <div className="container" style={{minHeight: '90vh'}}>
                    <div className="mt-5">
                    {
                        user != null ? 
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <img 
                                            className="img-fluid" 
                                            src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" 
                                            alt="Perfil"
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="container">
                                            <h4 className="text-muted">{this.state.user.username}</h4>
                                            <p className="text-muted">{this.state.user.email}</p>
                                            <div>
                                                <button className="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                        Alterar dados
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="collapse" id="collapseExample">
                                        <div className="card card-body">
                                            <form onSubmit={(e) => this.callSubmit(e)}>
                                                <div className="form-group">
                                                    <label htmlFor="username">Nome de usuário</label>
                                                    <input type="text" className="form-control" id="username" defaultValue={this.state.user.username} />
                                                </div>  
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="email" className="form-control" id="email" defaultValue={this.state.user.email} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Senha</label>
                                                    <input type="password" className="form-control" id="password" />
                                                </div>
                                                <button type="submit" className="btn btn-primary">Salvar</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <h4>Filmes alugados</h4>
                                    <div style={{overflowX: 'scroll', whiteSpace: 'nowrap', height: '300px', scrollbarWidth: 'thin'}} className="flex-row flex-nowrap bg-warning">
                                        {
                                            this.state.user.rents.length == 0 ? <p className="text-muted p-4">Você não tem filmes alugados</p> : ''
                                        }
                                        {
                                            this.state.user.rents.map((movie, idx) => (
                                                <div onClick={()=>this.goToMovie(movie.id)} key={idx} onKeyDown={() => this.goToMovie(movie.id)} className="movie-card" style={{height: '240px', width: '125px', cursor: 'pointer'}}>
                                                    <img className="img-fluid" style={{height: '200px', objectFit: 'cover'}} src={movie.image} alt={movie.title} />
                                                    <h6>{movie.title}</h6>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div>
                                    <h4>Watch List</h4>
                                    <div style={{overflowX: 'scroll', whiteSpace: 'nowrap', height: '300px', scrollbarWidth: 'thin'}} className="flex-row flex-nowrap bg-warning">
                                        {
                                            this.state.user.movies.length == 0 ? <p className="text-muted p-4">Sua Watch List está vazia</p> : ''
                                        }
                                        {
                                            this.state.user.movies.map((movie, idx) => (
                                                <div onClick={()=>this.goToMovie(movie.id)} key={idx} onKeyDown={() => this.goToMovie(movie.id)} className="movie-card" style={{height: '240px', width: '125px', cursor: 'pointer'}}>
                                                    <img className="img-fluid" style={{height: '200px', objectFit: 'cover'}} src={movie.image} alt={movie.title} />
                                                    <h6 className="h6 text-wrap">{movie.title}</h6>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <p>Loading...</p>
                    }
                    </div>
                </div>
                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                Editar dados
                            </div>
                            <div className="modal-body">

                            </div>
                            <div className="">

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}