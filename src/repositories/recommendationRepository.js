import connection from '../database/connection.js';

// since different artists may have a song with the same name,
// this functions verify both artist's and song's name
async function find(name, artist) {
    const dbResponse = await connection.query(
        'SELECT * FROM songs WHERE name = $1 AND artist = $2;',
        [name, artist],
    );

    return dbResponse.rows[0];
}

async function create(name, artist, youtubelink) {
    const dbResponse = await connection.query(
        'INSERT INTO songs (name, artist, ytlink) VALUES ($1, $2, $3) RETURNING *;',
        [name, artist, youtubelink],
    );

    return dbResponse.rows[0];
}

const recommendationRepository = {
    create,
    find,
};

export default recommendationRepository;
