export default function createDatabaseSongObject(id, score) {
    return {
        id: id ? id : 1,
        name: 'River',
        artist: 'Aurora',
        ytlink: 'https://www.youtube.com/watch?v=U12SSlWgwXM',
        score: score ? score : 0
    }
}