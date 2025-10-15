# GASプロジェクトテンプレート

これはGoogle Apps Script(GAS) を TypeScript で開発するためのプロジェクトテンプレートです。
モダンな開発ツールと規約を導入し、効率的で品質の高い開発を目指します。

## :memo: 1. 概要

このプロジェクトテンプレートでは、TypeScriptで書かれたソースコードを`esbuild`でビルドし、`@google/clasp`を使ってGASプロジェクトとしてデプロイします。また、`Jest`による単体テスト、`knip`による不要なコードの検出、`gitmoji`と`Conventional Commits`によるコミット規約を導入しています。

## :wrench: 2. 開発環境の構築

開発を始める前に、次のツールをローカル環境にセットアップしてください。

1. `Node.js`のインストール

    このプロジェクトは`Node.js` `v20` `LST版`を使用します。開発者間の環境を統一するため、バージョン管理ツール`nvm`(Node Version Manager)を利用します。`nvm`を使うことでプロジェクトごとに`Node.js`のバージョンを簡単に切り替えることができます。
    1. `nvm`のインストール
         - [nvm(macOS/Linux)](https://github.com/nvm-sh/nvm)
         - [nvm-windows(Windows)](https://github.com/coreybutler/nvm-windows)
    2. `Node.js`のインストール
         - Windows環境で`nvm-windows`を使用する場合、`.nvmrc`ファイルを読み込んでのインストール及び切り替えができないため、次のコマンドを実行してください。

            ```bash
            nvm install 20
            nvm use 20
            ```

         - nacOSもしくはLinux環境8の場合、プロジェクトのルートディレクトリで次のコマンドを実行してください。`.nvmrc`ファイルに記載のバージョンの`Node.js`がインストールされます。

            ```bash
            nvm install
            nvm use
            ```

2. プロジェクト依存関係のインストール
プロジェクトのルートディレクトリで次のコマンドを実行し、必要なパッケージをすべてインストールします。

    ```bash
    npm install
    ```

3. claspの認証
`GAS API`へのアクセスを許可するため、`clasp`の認証を行います。次のコマンドを実行するとブラウザが開、Googleアカウントでのログインを求められます。

    ```bash
    npx clasp login
    ```

4. gitmoji-cliのインストール
コミットメッセージを効率的に作成するため、`gitmoji-cli`をグローバルにインストールします。これによりどのプロジェクトでもgitmojiコマンドが使用できます。

    ```bash
    npm install -g gitmoji-cli
    ```

## :rocket: 3. プロジェクト設定

- SCRIPT ID
  - .clasp.json の `INSERT TO YOUR SCRIPT ID`をGASのスクリプトIDに置き換えてください。
  - このプロジェクトでは、GASへのpushは上書き更新（ALL DELETE → PASTE）となるため、GAS側のバックアップは適宜実施してください。

## :rocket: 4. 実装の流れ

実装の流れを記載します。

1. 関数の実装
いい感じに実装してください。サンプルとして日次トリガー用関数の新規作成方法を[こちら](docs/adding-functions.md)に記載するので必要に応じて参照してください。

2. 単体テストの実行
`Jest`を使って`src`ディレクトリ内のテストコードを実行します。

    ```bash
    npm test
    ```

3. ビルド
`esbuild`を使って`src`ディレクトリのTypeScriptファイルを`dist/index.js`にバンドルします。

    ```bash
    npm run build
    ```

4. gitへのコミット
単体テストとビルドが完了したソースコードをgitへコミットしてください。
コミット規約は[:memo: 5. コミット規約](#memo-5-コミット規約)を参照してください。

5. GASへの適用
ビルドされたファイルと`clasp`を使ってGASプロジェクトにアップロードします。

    ```bash
    npx clasp push # プッシュだけする場合
    npm run build && npx clasp push # ビルドしてプッシュする場合
    npx clasp open # GASプロジェクトをブラウザで開く
    ```

必要に応じて以下も実施してください。

- 不要なコードの検出
`knip`を実行し、プロジェクト内に使用されていないファイルや依存関係がないかチェックします。

    ```bash
    npx kinp
    ```

## :memo: 5. コミット規約

このプロジェクトテンプレートでは、コミットログの可読性と一貫性を保つため、gitmojiとConventional Commitsを組み合わせた規約を採用しています。
フォーマット：

```None
:emoji: <type>(<scope>): <subject>
```

例:

:sparkles: feat(auth): ユーザー認証機能を追加

:bug: fix(api): データ取得時のnullエラーを修正

:recycle: refactor: 認証ロジックを簡素化

コミットメッセージの作成には、gitmoji -cコマンド（gitmoji-cliをインストールした場合）を使うと便利です。

### gitmoji-cliを使ったコミット方法の例

`gitmoji-cli`を使用したコミット例を次に示します。

1. 変更をステージングします。

    ```bash
    git add . # 必要に応じてステージングファイルを変更してください。
    ```

2. `gitgmoji -c`コマンドを実行します。

    ```bash
    gitmoji -c
    ```

3. 対話形式でメッセージを作成します。

   - Choose a gitmoji:矢印キーでコミットの種類に合った絵文字を選択します。
   - Enter the commit title:コミットの件名(subject)を入力します。
   - Enter the commit message:コミットの詳細な説明(body)を入力します。不要な場合(件名だけで十分な場合など)は空のままEnterでも問題ありません。

4. 絵文字については次を利用してください。
あくまでも例なのでプロジェクト毎に追加/変更/削除してください。

    | 絵文字 | コード | 用途 |
    | :--- | :--- | :--- |
    | ✨ | `:sparkles:` | 新機能追加 |
    | 🐛 | `:bug:` | バグ修正 |
    | ♻️ | `:recycle:` | リファクタリング |
    | 📝 | `:memo:` | ドキュメントの追加/更新 |
    | ✅ | `:white_check_mark:` | テストの追加/更新/合格 |
    | 🎉 | `:tada:` | プロジェクトの開始 |
    | 🔖 | `:bookmark:` | リリース/バージョンのタグ |
    | 🚧 | `:construction:` | 作業進行中(WIP:Work In Progress) |
    | ✏️ | `:pencil2:` | タイプミスの修正 |
    | 🙈 | `:see_no_evil:` | .gitignoreの追加修正 |
  
## :building_construction: 6.プロジェクト構成

- このプロジェクトでは、TypeScriptで書かれたソースコードをカスタムスクリプト`build.ts`でGAS用のJavaScriptに変換します。`src/index.ts`からエクスポートされた関数をすべて検出し、`esbuild`で一つのファイルにまとめます。最後に、GASから直接呼び出せるグローバル関数を自動生成し、バンドルされたコードに繋ぎ込む仕組みです。Webpackというツールで一つのJavaScriptファイル(`dist/index.js`)にまとめています。
- 詳細は[GAS + Typescript のいい感じのビルド環境を整える](https://zenn.dev/terass_dev/articles/a39ab8d0128eb1)を参照してください。

### プロジェクト構成の補足

- `dependencies`vs`devDependencies`

このプロジェクトでは、すべてのツールを`devDependencies`で管理しています。これは、最終的にGAS環境で実行されるのはビルドされたJavaScriptコードのみであり、これらのツールは本番環境の動作に不要なためです。

- `knip.jsonc`
`knip`がプロジェクトの構造を正しく認識し、誤検出を防ぐための設定ファイルです。

- `package.json`

  - `"private": true` / `"files": []`
このプロジェクトがnpmパッケージとして公開されるライブラリではないことを明示しています。これにより、各種ツールがプロジェクトを正しく解釈し、不要な警告が表示されるのを防ぎます。

    - `"engines"`
プロジェクトが要求するNode.jsとnpmのバージョンを定義しています。互換性のないバージョンを使っている場合に警告を表示します。

## :alien: 7. 最後に

本プロジェクトはあくまでもテンプレートのため、各開発プロジェクトにて柔軟にルールを変更して適用してください。
また、良いルールが見つかれば、本テンプレートを修正し、マージリクエストしてください。
