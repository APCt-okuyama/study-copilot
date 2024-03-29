[f:id:mountain1415:20230602092210p:plain]

# はじめに
こんにちは。ACS 事業部の奥山です。

Github Copilot を利用して簡単なサンプルアプリを作成してみましたのでブログにしておきます。

## サンプルアプリについて 
現在地（緯度・経度）の情報をもとに天気の情報を取得するAPIの動作確認用の簡単なアプリです。
※SPA(Vue2 + Typescript)で作成しています。

### 完成した画面
[f:id:mountain1415:20230602091501p:plain]

画面表示時に天気APIをコールして取得できた天気情報を表示するだけのアプリになります。

## Github Copilotを使って作る

### 1.  緯度・経度を取得
天気APIで良くあるパラメーター緯度・経度を取得する処理  
関数名を getGeoLocation とだけを書いただけですが、navigator.geolocation.getCurrentPosition を利用して、緯度・経度を取得するプログラムが提案されています。エラーハンドリング部分も実装されていますね。
[f:id:mountain1415:20230602091523p:plain]

### 2. api.openweathermap.org の APIを呼び出す処理
関数名を getWeatherInfoOpenWeatherMap としてみました。こちらは fetch api を使った処理が提案されました。url の部分（https://api.openweathermap.org/data/2.5/weather?lat=）まで提案されているのがすごいですね。
受け取ったデータから json形式 で値を取り出すところまで一通り実装されています。
[f:id:mountain1415:20230602091545p:plain]

axiosを使った処理に変更したいなと思ったので関数名を getWeatherInfoOpenWeatherMapUsingAxios としてみました。axiosを使った処理が提案されました。いい感じですね。
[f:id:mountain1415:20230602091605p:plain]

### 3. 本日の日付を表示するために 文字列(yyyy年mm月nn日)
関数名をgetTodayString()としてみました。こちらは日付を取得する処理が提案されました。
[f:id:mountain1415:20230602091619p:plain]

曜日も表示したいな。ということで関数名に WithWeek とつけてみます。
[f:id:mountain1415:20230602091636p:plain]
いい感じで曜日が追加されました。すごいです。汎用的な処理はもう Copilot に書かせてしまえば良い感じですかね。

### 4. 気温の単位を変換する
HTML Templateでも提案してくれます。
[f:id:mountain1415:20230602091653p:plain]

提案された関数 convertKelvinToCelsius を追加します。
[f:id:mountain1415:20230602091707p:plain]

今回は簡単にここまでにしておきます。簡単なアプリですが、ほとんど Github Copilot が作ってくれた感じですね。

Github Copilot には開発をサポートする多くの機能があります。是非有効活用して開発効率・品質を上げていきましょう♪

# 最後に
私達ACS事業部はAzure・AKSを活用した内製化のご支援をしております。ご相談等ありましたらぜひご連絡ください。

[https://www.ap-com.co.jp/cloudnative/?utm_source=blog&utm_medium=article_bottom&utm_campaign=cloudnative:embed:cite]

また、一緒に働いていただける仲間も募集中です！   
切磋琢磨しながらスキルを向上できる、エンジニアには良い環境だと思います。ご興味を持っていただけたら嬉しく思います。

[https://www.ap-com.co.jp/recruit/info/requirements.html?utm_source=blog&utm_medium=article_bottom&utm_campaign=recruit:embed:cite]

<fieldset style="border:4px solid #95ccff; padding:10px">
本記事の投稿者: [奥山 拓弥](https://techblog.ap-com.co.jp/archive/author/mountain1415)  
</fieldset>
