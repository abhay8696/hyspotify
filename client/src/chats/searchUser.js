import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'

//contexts
import { SpotifyTokenContext } from '../contexts/spotifyTokenContext';
import { SpotifyTrackUriContext } from '../contexts/spotifyTrackUriContext';

//styles
import SearchStyles from '../spotify/styles/searchStyles'

//material ui

const SearchComp = (props) => {
    //styles
    const classes = SearchStyles();

    //props
    // const { closeSearchDrawer } = props;
    //contexts
    const
    [spotifyToken, setSpotifyToken] = useContext(SpotifyTokenContext),
    [spotifyTrackUri, setSpotifyTrackUri] = useContext(SpotifyTrackUriContext);

    //states
    const
    [searchText, setSearchText] = useState(''),
    [searchResult, setSearchResult] = useState([]);

    //life cycles
    useEffect(()=> {
        //fetch users
    }, [])

    //functions
    const
    displayResults = ()=> {
        let array = [];
        if(searchResult){
            console.log(searchResult)
            searchResult.map(item=> {
                array.push(
                    <div 
                    className={classes.track} 
                    key={item.albumUrl.url}
                    onClick={()=> {
                        setSpotifyTrackUri({uri:item.uri, trackName:item.title})
                        setSearchText('')
                        // closeSearchDrawer()
                        // hideSpotify()
                    }}>
                        <span>
                            <img 
                            src={item.albumUrl.url} 
                            className={classes.trackImg}
                            />
                        </span>
                        <div className={classes.trackInfo}>
                            <span className={classes.trackTitle}> {item.title} </span>
                            <span className={classes.trackArtist}> {item.artist} </span>
                        </div>
                    </div>
                )
            })
            return array
        }
    }


    return (
        <div>
            <span>Search Users </span>
            <div className={classes.searchBar}>
                <input 
                placeholder='Type Here'
                onChange = {evt=> setSearchText(evt.target.value)}
                className={classes.searchBox}
                autoFocus
                />
            </div>
            <div className={classes.searchResults}>
                {displayResults()}
            </div>
        </div>
    );
};

export default SearchComp;