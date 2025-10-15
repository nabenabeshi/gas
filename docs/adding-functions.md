# サンプル-日次トリガー用関数の新規作成方法

例としてtriggerDailyHogehoge という関数を新たに作成する手順を記載します。

1. `src/execHogehoge.ts`ファイルを作成し、実装します。
   - 関心の分離の観点から、ロジックは別ファイルに記載することを推奨します。
   - 単体テストも作成しやすくなります。

2. `test/execHogehoge.test.ts`ファイルを作成し、単体テストコードを実装します。
   - コードカバー率100%にしてください。

3. `src/index.ts`に以下のコードを記述します。

    ```typescript
    export function triggerDailyHogehoge(event:GoogleAppsScript.Events.TimeDriven){
        execHogehoge(event);
    }
    ```

   - 引数のeventは日次トリガーを想定しているので以下となります。
     - `GoogleAppsScript.Events.TimeDriven`
   - 他のイベントを受け取る場合は適宜変更してください。
     - イベントオブジェクトについては[イベント オブジェクト](https://developers.google.com/apps-script/guides/triggers/events?hl=ja)を参照してください。
   - 引数を使わない場合は削除しても良いです。
   - 基本的kに、`src/Index.ts`に記載するのは`execHogehoge(event);`のみです。

このプロジェクトに以下を実装してありますので参考にしてください。

- triggerDailyHogehoge
- execHogehoge
- execHogehoge.test
