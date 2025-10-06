import { execHogehoge } from '../src/execHogehoge';

// Google Apps Scriptの型定義をインポート
import 'google-apps-script';

describe('execHogehoge-test', () => {
  test('day-of-monthが1の場合、trueを返す', () => {
    // 毎月1日のイベントをモック
    const mockEvent = {
      "day-of-month": 1,
    } as GoogleAppsScript.Events.TimeDriven;
    expect(execHogehoge(mockEvent)).toBe(true);
  });

  test('day-of-monthが1以外の場合、falseを返す', () => {
    // 毎月2日のイベントをモック
    const mockEvent = {
      "day-of-month": 2,
    } as GoogleAppsScript.Events.TimeDriven;
    expect(execHogehoge(mockEvent)).toBe(false);
  });

}); 