import recommendationService from '../../src/services/recommendationService';
import recommendationRepository from '../../src/repositories/recommendationRepository.js';
import createDatabaseSongObject from './factories/createDatabaseSongObject.js';

describe("Highest ranked recommendations", () => {

    const getTop = jest.spyOn(recommendationRepository, 'getTop');

    it("returns an array of objects", () => {
        getTop.mockImplementation((amount) => {
            const arr = []
            for(let i = 0; i < amount; i++) {
                arr.push(createDatabaseSongObject());
            }
            return arr;
        })

        const response = recommendationService.topRecommendations(1);
        expect(response).resolves.toEqual([
            recommendationService.formatResponseData(createDatabaseSongObject())
        ])
    })

})