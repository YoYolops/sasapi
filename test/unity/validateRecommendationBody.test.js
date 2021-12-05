import recommendationService from '../../src/services/recommendationService.js';

describe("recommendation's body validator", () => {

    it('must return a object with "isValid" key containing "true" when proper body is passed', () => {
        const result = recommendationService.validateRecommendationBody({
            name: "artist - song name",
            youtubeLink: "https://www.youtube.com/watch?v=70bIU5GXVOA"
        });
        expect(result).toEqual({
            isValid: true,
        })
    })

    it('return object with "isValid" containing "false" and message key for unformatted entity when no url is passed', () => {
        const result = recommendationService.validateRecommendationBody({
            name: "artist - song name",
            youtubeLink: "not a url"
        });
        expect(result).toEqual({
            isValid: false,
            message: "Unformatted entity"
        })
    })

    it('return object with "isValid" containing "false" and message key for unformatted entity', () => {
        const result = recommendationService.validateRecommendationBody({
            name: "artist - song name",
        });
        expect(result).toEqual({
            isValid: false,
            message: "Unformatted entity"
        })
    })

    it('return object with "isValid" containing "false" and message key for link outside youtube domain', () => {
        const result = recommendationService.validateRecommendationBody({
            name: "artist - song name",
            youtubeLink: "https://www.notube.com/watch?v=70bIU5GXVOA"
        });
        expect(result).toEqual({
            isValid: false,
            message: "youtubeLink property should be a youtube domain url"
        })
    })

    it('return object with "isValid" containing "false" and message key for artist and song name unseparated', () => {
        const result = recommendationService.validateRecommendationBody({
            name: "artist and song name not properly separated",
            youtubeLink: "https://www.youtube.com/watch?v=70bIU5GXVOA"
        });
        expect(result).toEqual({
            isValid: false,
            message: 'Name propertie should have the artist and song name separated by " - "'
        })
    })

})