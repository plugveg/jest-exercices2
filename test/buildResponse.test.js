import { buildResponse } from '../src/buildResponse';
import { STATUS_API } from '../src/setResponseError';
import { computeDataError } from '../src/computeDataError';

jest.mock('../src/computeDataError');

describe('buildResponse', () => {
    let mockResponse;
    let config;

    beforeEach(() => {
        computeDataError.mockClear();
        mockResponse = {
            status: STATUS_API.SUCCESS,
            blob: jest.fn(),
            text: jest.fn(),
            json: jest.fn().mockResolvedValue({}),
        };
        config = {};
    });

    it('Should return object with statusHttp when status does not match any case', async () => {
        mockResponse.status = 'UNKNOWN_STATUS';
        const result = await buildResponse(mockResponse, config);
        expect(result).toEqual({ statusHttp: 'UNKNOWN_STATUS' });
    });

    it('Should return blob when config.blob is true', async () => {
        config.blob = true;
        await buildResponse(mockResponse, config);
        expect(mockResponse.blob).toHaveBeenCalled();
    });

    it('Should return text when config.text is true', async () => {
        config.text = true;
        await buildResponse(mockResponse, config);
        expect(mockResponse.text).toHaveBeenCalled();
    });

    it('Should return json when neither config.blob nor config.text is true', async () => {
        await buildResponse(mockResponse, config);
        expect(mockResponse.json).toHaveBeenCalled();
    });

    it('Should throw error when status starts with STATUS_API.ERROR', async () => {
        mockResponse.status = STATUS_API.ERROR;
        computeDataError.mockResolvedValue(new Error('Erreur: Problème technique ! Contacter votre support'));
        await expect(buildResponse(mockResponse, config)).rejects.toThrow('Erreur: Problème technique ! Contacter votre support');
    });

    it('Should throw error when status starts with STATUS_API.WARNING', async () => {
        mockResponse.status = STATUS_API.WARNING;
        await expect(buildResponse(mockResponse, config)).rejects.toThrow();
    });
});