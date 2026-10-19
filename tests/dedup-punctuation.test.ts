import { dedup } from '../src/dedup';

// A comma or a full stop is not a different record: names exported from two systems, one writing "Smith, John" and
// the other "Smith John", are one person.
describe('dedup and punctuation', () => {
  test('names that differ only by punctuation are duplicates by default', () => {
    const result = dedup(['Smith, John', 'Smith John', 'New York, NY', 'New York NY']);
    expect(result.unique).toEqual(['Smith, John', 'New York, NY']);
    expect(result.duplicates.map((d) => d.item)).toEqual(['Smith John', 'New York NY']);
  });
});
