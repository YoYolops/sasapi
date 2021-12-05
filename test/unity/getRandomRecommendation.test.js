import recommendationService from '../../src/services/recommendationService';
import recommendationRepository from '../../src/repositories/recommendationRepository.js';
import createDatabaseSongObject from './factories/createDatabaseSongObject.js';
import NotFoundError from '../../src/errors/NotFoundError.js';

describe("Recommendation vote handler", () => {

    const getRandom = jest.spyOn(recommendationRepository, 'getRandom');

    it("Must return an object", () => {
        getRandom.mockImplementationOnce(() => createDatabaseSongObject())

        const response = recommendationService.randomRecommendation(0.7);
        expect(response).resolves.toEqual(
            recommendationService.formatResponseData(createDatabaseSongObject())
        )
    })

    it("Must return an error for no songs registered yet", () => {
        getRandom.mockImplementation(() => null);

        const response = recommendationService.randomRecommendation(0.2);
        expect(response).rejects.toThrowError(NotFoundError)
    })

    it("border test below 0.3", () => {
        getRandom.mockImplementationOnce((value) => {
            if(value === 'score < 11') return createDatabaseSongObject(0)
            return createDatabaseSongObject(1)
        })

        const response = recommendationService.randomRecommendation(0.29);
        expect(response).resolves.toEqual(
            recommendationService.formatResponseData(createDatabaseSongObject(0))
        )
    })

    it("border test equal 0.3", () => {
        getRandom.mockImplementationOnce((value) => {
            if(value === 'score < 11') return createDatabaseSongObject(0)
            return createDatabaseSongObject(1)
        })

        const response = recommendationService.randomRecommendation(0.3);
        expect(response).resolves.toEqual(
            recommendationService.formatResponseData(createDatabaseSongObject(0))
        )
    })

    it("border test above 0.3", () => {
        getRandom.mockImplementationOnce((value) => {
            if(value === 'score < 11') return createDatabaseSongObject(0)
            return createDatabaseSongObject(1)
        })

        const response = recommendationService.randomRecommendation(0.3);
        expect(response).resolves.toEqual(
            recommendationService.formatResponseData(createDatabaseSongObject(1))
        )
    })

    it("should return any song when there is no song with the specified score", () => {
        getRandom.mockImplementation((value) => {
            if(!value) return createDatabaseSongObject(0)
            return null
        })

        const response = recommendationService.randomRecommendation(0.98);
        expect(response).resolves.toEqual(
            recommendationService.formatResponseData(createDatabaseSongObject(0))
        )
    })

})