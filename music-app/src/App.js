import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/songs')
      .then((response) => response.json())
      .then((data) => setSongs(data));
  }, []);

  const playSong = (songId) => {
    fetch(`/songs/${songId}`)
      .then((response) => response.json())
      .then((data) => setCurrentSong(data));
  };

  const addToPlaylist = (song) => {
    setPlaylist([...playlist, song]);
  };

  const removeFromPlaylist = (songId) => {
    const updatedPlaylist = playlist.filter((song) => song.id !== songId);
    setPlaylist(updatedPlaylist);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Music Player</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search songs"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="song-list">
        <h2>Song List</h2>
        <ul>
          {filteredSongs.map((song) => (
            <li key={song.id}>
              {song.title} by {song.artist}
              <button onClick={() => playSong(song.id)}>Play</button>
              <button onClick={() => addToPlaylist(song)}>Add to Playlist</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="playlist">
        <h2>Playlist</h2>
        <ul>
          {playlist.map((song) => (
            <li key={song.id}>
              {song.title} by {song.artist}
              <button onClick={() => removeFromPlaylist(song.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      {currentSong && (
        <div className="current-song">
          <h2>Now Playing</h2>
          <p>{currentSong.title} by {currentSong.artist}</p>
          <audio controls src={currentSong.audioSrc} />
        </div>
      )}
    </div>
  );
}

export default App;

