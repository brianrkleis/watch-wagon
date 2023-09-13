import React, { useState } from "react";
import { Typography, AppBar, CssBaseline, Grid, Toolbar, Container } from '@mui/material'
import SearchAppBar from "./SearchBar";
import Movies from "./MoviesComponent";


const App = () => {


    return (
        <div>
        <CssBaseline enableColorScheme/>
        <AppBar position="static">
          <SearchAppBar/>
        </AppBar>
        <Container maxWidth="lg">
          <Typography variant="h4" style={{ marginTop: '20px', marginBottom: '20px' }}>
            Filmes em destaque
          </Typography>
          <Grid container spacing={3}>
            <Movies></Movies>
          </Grid>
        </Container>

      </div>
    );
}

export default App;