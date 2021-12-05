import ConflicError from '../../src/errors/ConflictError.js';
import UnformattedDataError from '../../src/errors/UnformattedDataError.js';
import recommendationRepository from '../../src/repositories/recommendationRepository.js';
import recommendationService from '../../src/services/recommendationService.js';
import createDatabaseSongObject from './factories/createDatabaseSongObject.js';

describe("recommendation registration", () => {
    
    const findByName = jest.spyOn(recommendationRepository, 'findByName');
    const create = jest.spyOn(recommendationRepository, 'create');
    const properBodyData = {
        name: "Aurora - River",
        youtubeLink: "https://www.youtube.com/watch?v=wRTF43EsuqI",
    };

    it("must throw unformatted data error for unformatted body", () => {
        const response = recommendationService.register({});
        expect(response).rejects.toThrowError(UnformattedDataError);
    })

    it("must throw conflict error for already registered song", () => {
        findByName.mockImplementationOnce(() => ({}));
        const response = recommendationService.register(properBodyData);
        expect(response).rejects.toThrowError(ConflicError);
    })

    it("must return registered object", () => {
        findByName.mockImplementationOnce(() => null);
        create.mockImplementationOnce(() => createDatabaseSongObject());

        const response = recommendationService.register(properBodyData);
        expect(response).resolves.toEqual(
            recommendationService.formatResponseData(
                createDatabaseSongObject()
            )
        );
    })

})