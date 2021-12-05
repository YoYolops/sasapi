import connection from '../database/connection.js';

// since different artists may have a song with the same name,
// this functions verify both artist's and song's name
async function findByName(name, artist) {
    const dbResponse = await connection.query(
        'SELECT * FROM songs WHERE name = $1 AND artist = $2;',
        [name, artist],
    );
    return dbResponse.rows[0];
}

async function findById(id) {
    const dbResponse = await connection.query(
        'SELECT * FROM songs WHERE id = $1',
        [id],
    );
    return dbResponse.rows[0];
}

async function create(name, artist, youtubelink) {
    const dbResponse = await connection.query(
        'INSERT INTO songs (name, artist, ytlink) VALUES ($1, $2, $3) RETURNING *;',
        [name, artist, youtubelink],
    );

    const createdEntity = dbResponse.rows[0];
    createdEntity.name = `${createdEntity.artist} - ${createdEntity.name}`;

    return createdEntity;
}

async function changeScore(songId, value, type) {
    const dbResponse = await connection.query(
        `UPDATE songs SET score = score ${type === 'upvote' ? '+' : '-'} ${value} WHERE id = $1 RETURNING *;`,
        [songId],
    );
    return dbResponse.rows[0];
}

async function deleteById(songId) {
    const dbResponse = await connection.query(
        'DELETE FROM songs WHERE id = $1 RETURNING *;',
        [songId],
    );
    return dbResponse.rows[0];
}

async function getTop(amount) {
    const dbResult = await connection.query(
        'SELECT * FROM songs ORDER BY score DESC LIMIT $1;',
        [amount],
    );
    return dbResult.rows;
}

async function getRandom(where) {
    const query = where
        ? `SELECT * FROM songs WHERE ${where} ORDER BY RANDOM() LIMIT 1;`
        : 'SELECT * FROM songs ORDER BY RANDOM() LIMIT 1;';

    const dbResponse = await connection.query(query);
    return dbResponse.rows[0];
}

const recommendationRepository = {
    create,
    findByName,
    findById,
    changeScore,
    deleteById,
    getTop,
    getRandom,
};

export default recommendationRepository;
