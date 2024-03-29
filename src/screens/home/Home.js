import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
//import moviesData from '../../assets/movieData';
import genres from '../../common/genres';
import artists from '../../common/artists';
//import Details from '../details/Details';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import ReactDOM from 'react-dom';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }
});

class Home extends Component {
    constructor() {
        super();
        this.state = {
            movieName: "",
            upcomingMovies: [],
            genres: [],
            artists: [],
            releasedMovies: []
        }
    }

    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if(this.readyState===4) {
                console.log(JSON.parse(this.responseText));
                that.setState({upcomingMovies: JSON.parse(this.responseText).movies});
            }
        });
        xhr.open("GET", this.props.baseUrl+"movies?status=PUBLISHED");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);

        let dataReleased = null;
        let xhrReleased = new XMLHttpRequest();
        xhrReleased.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    releasedMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        xhrReleased.open("GET", this.props.baseUrl + "movies?status=RELEASED");
        xhrReleased.setRequestHeader("Cache-Control", "no-cache");
        xhrReleased.send(dataReleased);
    }

    movieNameChangeHandler = event => {
        this.setState({
            movieName: event.target.value
        });
        //console.log(this.state.movieName);
    }

    genreSelectHandler = event => {
        this.setState({ genres: event.target.value });
    }

    artistSelectHandler = event => {
        this.setState({ artists: event.target.value });
    }

    movieClickHandler = (movieId) => {
        //ReactDOM.render(<Details movieId={movieId} />, document.getElementById('root'));
        this.props.history.push('/movie/' + movieId);
    }

    render() {
        const { classes } = this.props;
        return(
          <div>
            <Header baseUrl={this.props.baseUrl}/>
              <div className={classes.upcomingMoviesHeading}>
                  <span>Upcoming Movies</span>
              </div>
              <GridList cols={5} className={classes.gridListUpcomingMovies} >
                  {this.state.upcomingMovies.map(movie => (
                      <GridListTile key={"upcoming"+movie.id}>
                          <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                          <GridListTileBar title={movie.title} />
                      </GridListTile>
                  ))}
              </GridList>
              <div className="flex-container">
                  <div className="left">
                      <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
                          {this.state.releasedMovies.map(movie => (
                              <GridListTile onClick={() => this.movieClickHandler(movie.id)} className="released-movie-grid-item" key={"grid" + movie.id}>
                                  <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                                  <GridListTileBar
                                      title={movie.title}
                                      subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                                  />
                              </GridListTile>
                          ))}
                      </GridList>
                  </div>
                  <div className="right">
                        <Card>
                            <CardContent>
                                <FormControl className={classes.formControl}>
                                    <Typography className={classes.title} color="textSecondary">
                                        FIND MOVIES BY:
                                    </Typography>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                    <Input id="movieName" onChange={this.movieNameChangeHandler} />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox-genre" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.genres}
                                        onChange={this.genreSelectHandler}
                                    >

                                        {genres.map(genre => (
                                            <MenuItem key={genre.id} value={genre.name}>
                                                <Checkbox checked={this.state.genres.indexOf(genre.name) > -1} />
                                                <ListItemText primary={genre.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.artists}
                                        onChange={this.artistSelectHandler}
                                    >

                                        {artists.map(artist => (
                                            <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                                <Checkbox checked={this.state.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                                <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="releaseDateStart"
                                        label="Release Date Start"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="releaseDateEnd"
                                        label="Release Date End"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <Button variant="contained" color="primary">
                                        APPLY
                                    </Button>
                                </FormControl>
                            </CardContent>
                        </Card>
                  </div>
              </div>
          </div>
        );
    }
}

export default withStyles(styles)(Home);
