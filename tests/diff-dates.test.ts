import { diff } from '../src/diff';

// A Date has no own enumerable keys, so the structural comparison saw every two Dates as equal and a changed
// timestamp was reported as unchanged.
describe('diff and Date fields', () => {
  test('a Date field that changed is a modification, and the same instant is unchanged', () => {
    const before = [{ id: 1, updatedAt: new Date('2026-01-01T00:00:00Z') }];
    const after = [{ id: 1, updatedAt: new Date('2026-06-01T00:00:00Z') }];
    const changed = diff(before, after);
    expect(changed.modified).toHaveLength(1);
    expect(Object.keys(changed.modified[0].changes)).toEqual(['updatedAt']);
    const same = diff(before, [{ id: 1, updatedAt: new Date('2026-01-01T00:00:00Z') }]);
    expect(same.unchanged).toHaveLength(1);
    expect(same.modified).toHaveLength(0);
  });
});
