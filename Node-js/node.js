const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const songs = [
  {
    id: 1,
    title: 'Song 1',
    artist: 'Artist 1',
    audioSrc: 'song1.mp3',
  },
  {
    id: 2,
    title: 'Song 2',
    artist: 'Artist 2',
    audioSrc: 'song2.mp3',
  },
  // Add more songs here
];

const playlists = [
  {
    id: 1,
    name: 'My Playlist',
    songs: [1, 2], // Song IDs
  },
  // Add more playlists here
];

// Get all songs
app.get('/api/songs', (req, res) => {
  res.json(songs);
});

// Get a specific song by ID
app.get('/api/songs/:id', (req, res) => {
  const songId = parseInt(req.params.id);
  const song = songs.find((s) => s.id === songId);
  if (!song) {
    return res.status(404).json({ message: 'Song not found' });
  }
  res.json(song);
});

// Get all playlists
app.get('/api/playlists', (req, res) => {
  res.json(playlists);
});

// Create a new playlist
app.post('/api/playlists', (req, res) => {
  const newPlaylist = {
    id: playlists.length + 1,
    name: req.body.name,
    songs: req.body.songs || [], // Song IDs
  };
  playlists.push(newPlaylist);
  res.status(201).json(newPlaylist);
});

// Add a song to a playlist
app.put('/api/playlists/:id/add-song', (req, res) => {
  const playlistId = parseInt(req.params.id);
  const { songId } = req.body;

  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) {
    return res.status(404).json({ message: 'Playlist not found' });
  }

  const songIndex = songs.findIndex((s) => s.id === songId);
  if (songIndex === -1) {
    return res.status(404).json({ message: 'Song not found' });
  }

  playlist.songs.push(songId);
  res.json(playlist);
});

// Delete a playlist
app.delete('/api/playlists/:id', (req, res) => {
  const playlistId = parseInt(req.params.id);
  const index = playlists.findIndex((p) => p.id === playlistId);
  if (index === -1) {
    return res.status(404).json({ message: 'Playlist not found' });
  }
  playlists.splice(index, 1);
  res.json({ message: 'Playlist deleted' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
