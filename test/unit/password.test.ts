import { Password } from '../../src/core/domain/entities/password'

describe('Password', () => {
    test('should validate password', () => {
        const input = '123456'
        const password = Password.create(input)
        expect(password.value).toBeDefined()
        expect(password.validate(input)).toBeTruthy()
    })
    test('should return false for password invalid', () => {
        const input = '123456'
        const password = Password.create(input)
        expect(password.value).toBeDefined()
        expect(password.validate('56265')).toBeFalsy()
    })
})
