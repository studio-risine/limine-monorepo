import { describe, expect, test } from 'vitest'

describe('Sample test with Matth.srqt', () => {
	test('Math.sqrt()', () => {
		expect(Math.sqrt(4)).toBe(2)
		expect(Math.sqrt(144)).toBe(12)
		expect(Math.sqrt(2)).toBe(Math.SQRT2)
	})
})
