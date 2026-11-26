import type { Song } from '../types/song'

export const initialSongs: Song[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    genre: 'Rock',
    plays: 40,
  },
  {
    id: '2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    genre: 'Synth-pop',
    plays: 50,
  },
  {
    id: '3',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    genre: 'Pop',
    plays: 30,
  },
  {
    id: '4',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    genre: 'Electropop',
    plays: 20,
  },
  {
    id: '5',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    genre: 'Pop',
    plays: 45,
  },
  {
    id: '6',
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    genre: 'Grunge',
    plays: 25,
  },
  {
    id: '7',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    genre: 'Rock',
    plays: 15,
  },
  {
    id: '8',
    title: 'Hotel California',
    artist: 'Eagles',
    genre: 'Rock',
    plays: 10,
  },
  {
    id: '9',
    title: 'Imagine',
    artist: 'John Lennon',
    genre: 'Soft Rock',
    plays: 5,
  },
  {
    id: '10',
    title: 'In the End',
    artist: 'Linkin Park',
    genre: 'Nu Metal',
    plays: 35,
  },
]

export const initialRelations: [string, string][] = [
  ['1', '7'],
  ['1', '8'],
  ['2', '3'],
  ['2', '4'],
  ['3', '5'],
  ['4', '5'],
  ['6', '10'],
  ['6', '1'],
  ['7', '8'],
  ['8', '9'],
  ['9', '1'],
  ['10', '7'],
]
