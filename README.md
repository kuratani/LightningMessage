LightningMessage
================
チーム内の爆速コミュニケーションを実現するLightningアプリケーション

はじめに
--------
Salesforce1でChatterメッセージを使えなくて困ったことはありませんか？

- ちょっとした相談。
- ランチに誘うメッセージ。
- 出先のちょっとした連絡。
　　　
Chatterに投稿してしまうとタイムラインが全体で共有しなくてもよい待ち合わせなどの連絡で埋もれてしまうため、本来すべき投稿もつい少なくなりコミュニケーション・ロスになっていませんか？

こういった用途のためにChatterメッセージがありますが、モバイルで利用できてこそ真価を発揮するはずなのに、未だ公式のSalesforce1アプリケーションでは対応されていません。今春に公開された+MessageはSalesforce1アプリケーション上で動作しますが、起動や動作が遅く爆速コミュニケーションを実現できませんでした。

LightningMessageは、Salesforce1/LightningアプリケーションとしてChatterメッセージが利用できるようになります。これまでより爆速コミュニケーションを実現し、ユーザ利便性の向上、シャドーITによるセキュリティリスクの緩和にも貢献します。

LightningMessageを利用することで、以下のようなことが実現できます。
- やりとりしている会話一覧を表示できます
- やりとりしている会話でメッセージを投稿できます
- 新たに会話を始める場合、宛先となるメンバーをリスト中からタップして選び、メッセージを投稿できます


デモンストレーション
--------
* [動画](https://www.youtube.com/watch?v=JURq8FAbLSw)


インストール方法
--------
1. build.propertiesをbuild-sample.propertiesを参考にして作成する
1. [ビルド]>[開発]>[Aura バンドル]で[Enable Lightning Components]のチェックをオンにして保存する
1. [ビルド]>[作成]>[パッケージ]でパッケージ名を登録する
1. build.propertiesのlm.namespaceにパッケージ名を設定する
1. ソースコードを組織にデプロイします。
1. Salesforce1に組み込む場合は、[設定]>[管理]>[モバイル管理]>[モバイルナビゲーション]で「メッセージ」をナビゲーションメニュー項目に追加します。

起動方法
--------
- Lightningアプリケーションとして起動する場合は、ブラウザで下記のようにURLを指定する
 https://(instance).lightning.force.com/(namespace)/LightningMessage.app
- Salesforce1として起動する場合は、ナビゲーションメニューから起動する

アーキテクチャ
--------
Salesforce1/単独のLightningアプリケーションとして動作します。
画面はLightning Componentで実装し、ChatterメッセージはAPI(Chatter in Apex)を呼び出しています。

利用している主なライブラリは以下のとおりです。
* [Bootstrap](http://getbootstrap.com/)

利用しているツールは以下のとおりです。
* [Ant](http://ant.apache.org/)


ライセンス
--------
Copyright &copy; 2014 Akira.Kuratani.

[MIT License](http://www.opensource.org/licenses/mit-license.php)