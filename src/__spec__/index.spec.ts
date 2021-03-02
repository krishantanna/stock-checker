import { returnSKUStock } from "../index"

describe('SKU Stock Function', () => {
    it('should throw an error when SKU input does not exist', async () => {
        await expect(returnSKUStock('trial')).rejects.toThrow('Error: SKU not recognised')
    });
    it('returns correct stock level for valid SKU', async () => {
        const result = await returnSKUStock('ILJ610772/87/04')
        const expected = { sku: 'ILJ610772/87/04', qty: 6683 }
        expect(result).toMatchObject(expected)
    });
});