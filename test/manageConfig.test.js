import manageConfig from '../src/manageConfig';

describe('manageConfig', () => {
    const fetchAuthConfig = {
        headers: { 'Authorization': 'Bearer token' },
        method: 'GET',
        body: 'request body'
    };

    it('Returns full config for API_URL.BASE', () => {
        const result = manageConfig('base', fetchAuthConfig);
        expect(result).toEqual(fetchAuthConfig);
    });

    it('Returns config without headers for non-API_URL.BASE', () => {
        const { headers, ...expectedConfig } = fetchAuthConfig;
        const result = manageConfig('github', fetchAuthConfig);
        expect(result).toEqual(expectedConfig);
    });

});