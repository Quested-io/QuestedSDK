import { init, instance } from '../src/index';

describe('unit | isNumberParseable', () => {

  beforeAll(() => {
    init({
      activityId: 'tower-defence',
      onReady: () => console.log('Quested SDK is ready')
    })
  })

  it('returns `true` for values parseable number', () => {
    instance.api.player.trackEvent('test', {test: 'test'})
    // expect(isNumberParseable('-7.5')).toBe(true);
    // expect(isNumberParseable(false)).toBe(true);
    // expect(isNumberParseable(1892)).toBe(true);
  });

  // it('returns `false` for values non parseable to number', () => {
  //   expect(isNumberParseable('A8sa')).toBe(false);
  //   expect(isNumberParseable({})).toBe(false);
  //   expect(isNumberParseable(NaN)).toBe(false);
  //   expect(isNumberParseable('18L')).toBe(false);
  // });
});
