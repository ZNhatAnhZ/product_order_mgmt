import {ProductSchema} from "../schemas/ProductSchema";
import {act} from "@testing-library/react";

describe('formatCurrency', () => {
    const validProductData = {
        name: 'Test Product',
        description: 'This is a test product description',
        stock: 10,
        image: 'https://example.com/image.jpg',
        status: 'active'
    };

    it('validate price is required', async () => {
        expect(ProductSchema.isValidSync(validProductData)).toBe(false);
        await expect(act(async () => {
            await ProductSchema.validate(validProductData);
        })).rejects.toThrow('Price is required');
    });

    it('validate price should be a number', async () => {
        const testingProductData = {...validProductData, price: 'dasdas'};
        expect(ProductSchema.isValidSync(testingProductData)).toBe(false);
        await expect(act(async () => {
            await ProductSchema.validate(testingProductData);
        })).rejects.toThrow(new RegExp("(price must be a `number` type).*"));
    });

    it('validate Price must be at least $0.01', async () => {
        const testingProductData = {...validProductData, price: -1};
        expect(ProductSchema.isValidSync(testingProductData)).toBe(false);
        await expect(act(async () => {
            await ProductSchema.validate(testingProductData);
        })).rejects.toThrow('Price must be at least $0.01');
    });

    it('validate Price must be at most $999,999', async () => {
        const testingProductData = {...validProductData, price: 99999999999};
        expect(ProductSchema.isValidSync(testingProductData)).toBe(false);
        await expect(act(async () => {
            await ProductSchema.validate(testingProductData);
        })).rejects.toThrow('Price must be at most $999,999');
    });
});
