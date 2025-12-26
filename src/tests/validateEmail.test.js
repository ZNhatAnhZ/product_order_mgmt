import {UserSchema} from "../schemas/UserSchema";
import {act} from "@testing-library/react";

describe('UserSchema Email Validation', () => {
    const validUserData = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false
    };

    it('validate email is required', async () => {
        const testingUserData = {...validUserData};
        delete testingUserData.email;

        expect(UserSchema.isValidSync(testingUserData)).toBe(false);
        await expect(act(async () => {
            await UserSchema.validate(testingUserData);
        })).rejects.toThrow('Email is required');
    });

    it('validate email should not be empty string', async () => {
        const testingUserData = {...validUserData, email: ''};
        expect(UserSchema.isValidSync(testingUserData)).toBe(false);
        await expect(act(async () => {
            await UserSchema.validate(testingUserData);
        })).rejects.toThrow('Email is required');
    });

    it('validate email should have valid format - missing @', async () => {
        const testingUserData = {...validUserData, email: 'testexample.com'};
        expect(UserSchema.isValidSync(testingUserData)).toBe(false);
        await expect(act(async () => {
            await UserSchema.validate(testingUserData);
        })).rejects.toThrow('Please enter a valid email format');
    });

    it('validate email should have valid format - missing domain', async () => {
        const testingUserData = {...validUserData, email: 'test@'};
        expect(UserSchema.isValidSync(testingUserData)).toBe(false);
        await expect(act(async () => {
            await UserSchema.validate(testingUserData);
        })).rejects.toThrow('Please enter a valid email format');
    });

    it('validate email should have valid format - missing username', async () => {
        const testingUserData = {...validUserData, email: '@example.com'};
        expect(UserSchema.isValidSync(testingUserData)).toBe(false);
        await expect(act(async () => {
            await UserSchema.validate(testingUserData);
        })).rejects.toThrow('Please enter a valid email format');
    });

});
