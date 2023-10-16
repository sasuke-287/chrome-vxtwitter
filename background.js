// 右クリック時に出る表示のやつ
chrome.contextMenus.create({
  title: "vxtwitterリンクをコピー",
  type: "normal",
  contexts: ["page", "link"],
  onclick: conversionURL(),
});

// リンクで右クリックするとメニュー表示する
function conversionURL(info, tab) {
  return function (info, tab) {
    var tweetUrl = info.linkUrl;

    // URLが渡されなかったら現在のタブURLを取得する
    if (tweetUrl === undefined) {
      tweetUrl = info.pageUrl;
    }

    // https://twitter.com/アカウント名/status/xxxxxxxxxxxxxxxxxx
    // https://x.com/アカウント名/status/xxxxxxxxxxxxxxxxxx?s=46&t=QBV7GZGtGSBXWXiYCRPFHA
    // ツイートIDの後に?がある場合は以後の文字列を削除する

    var splitUrl = tweetUrl.split("/");

    // ツイートURLか判別
    if (splitUrl[4] != "status") {
      // ツイートURLではない時はそのままを返すようにする
      returnUrl = tweetUrl;
    } else {
      // [ 'https:', ''. 'twitter.com', 'アカウント名', 'status', 'xxxxxxxxxxxxxxxxxx']
      splitUrl.splice(2, 1, "vxtwitter.com");

      returnUrl = splitUrl.join("/");
    }

    saveToClipboard(returnUrl); // 取得した文字列をクリップボードにコピーする関数に送る
  };
}

// 変換したURLをクリップボードに送る
function saveToClipboard(str) {
  var textArea = document.createElement("textarea");
  document.body.appendChild(textArea);
  textArea.value = str;
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}
