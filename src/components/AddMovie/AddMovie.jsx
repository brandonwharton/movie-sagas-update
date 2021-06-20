// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// components/styling
import CancelButton from '../CancelButton/CancelButton';
import './AddMovie.css';
// material-UI components
import Typography from '@material-ui/core/Typography';
import '@fontsource/roboto'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';





function AddMovie() {
    const dispatch = useDispatch();
    const history = useHistory();
    // get all genres from reducer
    const genres = useSelector(store => store.genres);
    // GET all genres on page load
    const [newMovie, setNewMovie] = useState({
        title: '',
        poster: '',
        description: '',
        genre_id: 1
    });
    // state for holding the list of genres the user wants to add to a new movie
    const [newGenres, setNewGenres] = useState([]);

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES'});
    }, []);

    // change handler for entire input form, sets individual newMovie
    // keys as they're changed by user
    const handleChangeFor = (event, propertyName) => {
        setNewMovie({
            ...newMovie,
            [propertyName]: event.target.value
        })
    }

    const handleGenreAdd = (event) => {
        setNewGenres([...newGenres, event.target.value]);
    }


    // submit handler for save button to dispatch newMovie data and navigation back to list
    const handleSubmit = (event) => {
        event.preventDefault();
        // send newMovie data to redux saga
        dispatch({ type: 'ADD_NEW_MOVIE', payload: newMovie });
        // navigate back to movie list
        history.push('/');
    }



    // console.log(newMovie);
    console.log(newGenres);
    return (
        <div>
            <Typography variant="h4" content="h4" className="add-movie-heading">
                Add a Movie
            </Typography>
            <FormControl onSubmit={handleSubmit} className="add-edit-form">
                <TextField
                    label="title"
                    required={true}
                    InputProps={{inputProps: {min: 1}}}
                    onChange={(event) => handleChangeFor(event, 'title')}
                >
                </TextField>
                <TextField
                    label="poster URL"
                    required
                    onChange={(event) => handleChangeFor(event, 'poster')}
                >
                </TextField>
                <TextField
                    label="description"
                    multiline
                    required
                    rows={6}
                    rowsMax={6}
                    variant="outlined"
                    onChange={(event) => handleChangeFor(event, 'description')}
                >
                </TextField>
                {/* <InputLabel id="genre-select-label">
                    Genre
                </InputLabel> */}
                <Select value={newMovie.genre_id} label="genre" onChange={handleGenreAdd}>
                    {genres?.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                        {genre.name}
                    </MenuItem>
                    ))}
                </Select>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </FormControl>
            <CancelButton />
        </div>

    )
}

export default AddMovie;