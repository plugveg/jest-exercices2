import { isValidDate, formatDate, setDate } from '../src/formatDate';

describe('isValidDate', () => {
    it('Should return true for invalid date as string', () => {
        expect(isValidDate('not a date')).toBe(true);
    });

    it('Should return false for null', () => {
        expect(isValidDate(null)).toBe(false);
    });

    it('Should return false for undefined', () => {
        expect(isValidDate(undefined)).toBe(false);
    });

    it('Should return false for an empty string', () => {
        expect(isValidDate('')).toBe(false);
    });
});

describe('formatDate', () => {
    it('Should format the date correctly by default', () => {
        expect(formatDate()).toBe('01/01/1970');
    });

    it('Should return an empty string for an empty input', () => {
        expect(formatDate('')).toBe('');
    });

    it('Should format a specific date according to locale and options', () => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        expect(formatDate('2023-04-05', 'fr-FR', options)).toBe('5 avril 2023');
    });
});

describe('setDate', () => {
    it('Should return an empty string if the date is invalid', () => {
        expect(setDate({ date: null })).toBe('');
    });

    it('Should format the date if it is valid', () => {
        const date = '2023-04-05';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        expect(setDate({ date, formatDateFn: (date) => formatDate(date, 'fr-FR', options) })).toBe('05/04/2023');
    });
});
