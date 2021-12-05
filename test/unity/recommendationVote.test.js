import recommendationService from '../../src/services/recommendationService';
import recommendationRepository from '../../src/repositories/recommendationRepository.js';
import NotFoundError from '../../src/errors/NotFoundError.js';
import createDatabaseSongObject from './factories/createDatabaseSongObject.js';

describe("Recommendation vote handler", () => {

    const findById = jest.spyOn(recommendationRepository, 'findById');
    const changeScore = jest.spyOn(recommendationRepository, 'changeScore');
    const deleteById = jest.spyOn(recommendationRepository, 'deleteById');

    it("Must return not found error for unexisting recommendation", () => {
        findById.mockImplementationOnce(() => null);
        const response = recommendationService.vote(1, 1, 'upvote');

        expect(response).rejects.toThrowError(NotFoundError)
    })

    it("Must return not found error for song deleted in between the function execution", () => {
        findById.mockImplementationOnce(() => ({}));
        changeScore.mockImplementationOnce(() => null)
        const response = recommendationService.vote(1, 1, 'upvote');

        expect(response).rejects.toThrowError(NotFoundError)
    })

    it("Must return voted object", () => {
        findById.mockImplementationOnce(() => ({}));
        changeScore.mockImplementationOnce(() => createDatabaseSongObject());
        deleteById.mockImplementationOnce(() => ({}));
        const response = recommendationService.vote(1, 1, 'upvote');

        expect(response).resolves.toEqual(
            recommendationService.formatResponseData(
                createDatabaseSongObject()
            )
        );
    })

    it("Must return empty object when score is below -5", () => {
        findById.mockImplementationOnce(() => ({}));
        changeScore.mockImplementationOnce(() => createDatabaseSongObject(1, -6));
        deleteById.mockImplementationOnce(() => ({}));
        const response = recommendationService.vote(1, 1, 'upvote');

        expect(response).resolves.toEqual({});
    })

})