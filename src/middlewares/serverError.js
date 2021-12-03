function serverErrorHandler(err, req, res, next) {
    console.error('INTERNAL SERVER ERROR');
    console.log(err);
    res.sendStatus(500);
}

export default serverErrorHandler;