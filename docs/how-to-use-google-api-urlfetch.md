# UrlFetchを使用したGoogle APIの実行

Google Apps Script (GAS) からGoogle APIを呼び出す方法には、主に「拡張サービス」を利用する方法と、「`UrlFetchApp`サービス」を利用する方法の2つがあります。

このドキュメントでは、後者の`UrlFetchApp`を利用する方法を推奨し、その理由と具体的な実装方法について解説します。

---

## 🚀 なぜUrlFetchAppを利用するのか

`CalendarApp`や`GmailApp`のような組み込みサービスとは別に、GASではGoogle Drive APIやYouTube Data APIなどの他のGoogle APIを「拡張サービス」として有効化して利用できます。これは一見便利ですが、プロジェクトの管理や運用の観点からいくつかの課題があります。

そのため、APIアクセス方法を**`UrlFetchApp`に統一する**ことを推奨します。主な理由は以下の通りです。

* **API実行の可視性がないデフォルトGCPプロジェクトの利用を避けるため**
  * 拡張サービスは、GASプロジェクトに紐づく**デフォルトのGCP（Google Cloud Platform）プロジェクト**で有効になってしまいます。
  * このデフォルトGCPプロジェクトは、APIの実行回数やエラーレート、割り当て（クォータ）の状況などを確認するためのダッシュボードが提供されておらず、**利用状況がブラックボックス**になりがちです。
  * 安定した運用のためには、APIの使用状況を監視・分析できる**標準のGCPプロジェクト**に切り替える必要があり、デフォルトのGCPプロジェクトは利用しません。

* **拡張サービスでは対応していないAPIがあるため**
  * Googleが提供する全てのAPIがGASの拡張サービスとして提供されているわけではありません。
  * 将来的に非対応のAPIを利用する必要が出た場合に、`UrlFetchApp`を使った呼び出し方法も別途実装する必要があり、コードベースの統一性が失われます。

これらの理由から、APIアクセスの方法は`UrlFetchApp`に統一し、認証にはOAuth2ライブラリを利用するアプローチを採用します。

---

## 🔧 実装方法：UrlFetchApp と OAuth2ライブラリ

`UrlFetchApp`でGoogle APIを呼び出すには、APIリクエストが正当なものであることを証明するための**認証**処理が必要です。ここでは、コミュニティで広く利用されている`apps-script-oauth2`ライブラリを使ってOAuth2認証を実装します。

### 1. OAuth2ライブラリの追加

まず、GASのプロジェクトに`apps-script-oauth2`ライブラリを追加します。

1. GASエディタの左側のメニューから「ライブラリ」の横にある`+`アイコンをクリックします。
2. 「スクリプトID」の入力欄に、以下のIDを貼り付けて「検索」をクリックします。
    > `1B7FSrk57A1B1Ld3gsKAzPL2iF4bMUlB4XF_L0NnStnkKP-pp2_soXjpM`
3. バージョンを選択し（通常は最新版を推奨）、「追加」ボタンをクリックします。
    * 識別子はデフォルトの`OAuth2`のままで問題ありません。

### 2. 認証サービスの作成

次に、OAuth2の認証フローを管理するサービスを作成します。このコードは、どのGoogle APIを、どの権限（スコープ）で利用するかを定義するものです。

```javascript
/**
 * OAuth2認証のためのサービスインスタンスを作成・設定します。
 * @return {OAuth2.Service} 認証サービスオブジェクト
 */
function getOAuth2Service() {
  // 利用するAPIに応じて、承認画面に表示されるサービス名を指定します。
  const serviceName = 'googleApiWithUrlFetch';

  // 標準のGCPプロジェクトで作成したクライアントIDとシークレットを設定します。
  // これらの情報はGCPコンソールの「APIとサービス > 認証情報」から取得できます。
  return OAuth2.createService(serviceName)
    // 認証情報を保存する場所を指定します。（通常はユーザーごと）
    .setCache(CacheService.getUserCache())
    .setLock(LockService.getUserLock())
    
    // クライアントIDとクライアントシークレットを設定
    .setClientId('YOUR_CLIENT_ID.apps.googleusercontent.com')
    .setClientSecret('YOUR_CLIENT_SECRET')
    
    // このスクリプトが実行された後にリダイレクトされるURL
    .setCallbackFunction('authCallback')
    
    // 認証情報を保存するプロパティストアを指定
    .setPropertyStore(PropertiesService.getUserProperties())
    
    // APIに必要な権限（スコープ）を要求します。
    // 例：Google Drive APIの読み取り専用権限
    .setScope('[https://www.googleapis.com/auth/drive.readonly](https://www.googleapis.com/auth/drive.readonly)')
    
    // オフラインアクセスを要求（リフレッシュトークンを取得するため）
    .setParam('access_type', 'offline')
    .setParam('prompt', 'consent');
}

/**
 * 認証フロー完了後に呼び出されるコールバック関数です。
 * @param {object} request 認証リクエスト情報
 */
function authCallback(request) {
  const service = getOAuth2Service();
  const isAuthorized = service.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('認証に成功しました。タブを閉じてください。');
  } else {
    return HtmlService.createHtmlOutput('認証に失敗しました。');
  }
}
