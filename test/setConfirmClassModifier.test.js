import setConfirmClassModifier from '../src/setConfirmClassModifier';

describe('setConfirmClassModifier', () => {
    it('Should return "confirm success" if hasErrors is false', () => {
        const result = setConfirmClassModifier(false);
        expect(result).toBe('confirm success');
    });

    it('Should return "confirm disabled" if hasErrors is true', () => {
        const result = setConfirmClassModifier(true);
        expect(result).toBe('confirm disabled');
    });

    it('Should allow customizing the classModifier', () => {
        const customClassModifier = 'custom';
        const result = setConfirmClassModifier(false, customClassModifier);
        expect(result).toBe('custom success');
    });

    it('Should return "custom disabled" with a custom classModifier and hasErrors true', () => {
        const customClassModifier = 'custom';
        const result = setConfirmClassModifier(true, customClassModifier);
        expect(result).toBe('custom disabled');
    });
});
