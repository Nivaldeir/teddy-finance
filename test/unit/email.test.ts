import { Email } from '../../src/core/domain/entities/email'
describe('should emails', () => {
    test('should validate email', () => {
        const value = 'test@example.com'
        const email = new Email(value)
        expect(email.value).toEqual(value)
    })
    test('should return throw error', () => {
        const value = 'test'
        expect(() => new Email(value)).toThrow('invalid email address')
    })
})
