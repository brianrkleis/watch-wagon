import React from "react";
import { Typography, AppBar, Card, CardContent, CardActionArea, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@mui/material'
class Movies extends React.Component{
    allMovies = [
        {
            title: 'Rebbeca',
            image: 'https://via.placeholder.com/200x300',
          },
          {
            title: 'Como Era Verde Meu Vale ',
            image: 'https://via.placeholder.com/200x300',
          },
          {
            title: 'Vertigo',
            image: 'https://via.placeholder.com/200x300',
          },
          {
              title: 'Shrek',
              image: 'https://via.placeholder.com/200x300',
            },
            {
              title: 'Casa Monstro',
              image: 'https://via.placeholder.com/200x300',
            },    
          
        ];
    filteredMovies = [...this.allMovies]

    constructor(props) {
        super(props);
        this.state = {
            movies: [

            ],
            filteredMovies: [

            ]
        }
    }

    filterMovies (input){
        console.log('chegou')
        this.filteredMovies = this.filteredMovies.filter((value)=>{
            return (new RegExp(".*" + input + ".*").exec(value.title)) != null
        })  
    }
    render (){
        return <>{this.filteredMovies.map((movie, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    image={movie.image}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {movie.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </>
    }

}
export default Movies;