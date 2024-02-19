import { computeDataError } from '../src/computeDataError';
import { setResponseError } from '../src/setResponseError';
import { STATUS_HTTP_MESSAGES } from '../src/setResponseError';

jest.mock('../src/setResponseError');

describe('computeDataError', () => {
    let mockSetResponseError
    beforeEach(() => {
        setResponseError.mockClear();
        mockSetResponseError = jest.fn();
    });

    it('Should handle successful JSON parsing', async () => {
        const mockResponse = {
            json: jest.fn().mockResolvedValue({ message: 'Success' }),
            status: 200,
        };

        await computeDataError(mockResponse, mockSetResponseError);

        expect(mockSetResponseError).toHaveBeenCalledWith({
            response: { message: 'Success', status: 200 },
        });
    });

    it('Should handle JSON parsing error', async () => {
        const mockResponse = {
            json: jest.fn().mockRejectedValue(new Error('Failed to parse')),
            status: 500,
        };

        await computeDataError(mockResponse, mockSetResponseError);

        expect(mockSetResponseError).toHaveBeenCalledWith({
            response: {
                anomaly: { label: 'Erreur: Problème technique ! Contacter votre support' },
                status: 500,
            },
        });
    });

    it('Should correctly process a valid JSON response', async () => {
        const fakeResponse = {
            json: () => Promise.resolve({ message: 'Une erreur est survenue' }),
            status: 400,
        };
        const expectedResponse = {
            response: { message: 'Une erreur est survenue', status: 400 },
        };

        await computeDataError(fakeResponse);

        expect(setResponseError).toHaveBeenCalledWith(expectedResponse);
    });

    it('Should handle an error when reading the JSON response', async () => {
        const fakeResponse = {
            json: () => Promise.reject(new Error('Erreur de lecture')),
            status: 500,
        };
        const expectedResponse = {
            response: {
                anomaly: { label: STATUS_HTTP_MESSAGES[500] },
                status: 500,
            },
        };

        await computeDataError(fakeResponse);

        expect(setResponseError).toHaveBeenCalledWith(expectedResponse);
    });
});
