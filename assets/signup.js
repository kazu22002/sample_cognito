// ユーザープールの設定
const poolData = {
    UserPoolId : "ユーザープールID",
    ClientId : 'クライアントID'
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var attributeList = [];

/**
 * 画面読み込み時の処理
 */
$(document).ready(function() {

    // Amazon Cognito 認証情報プロバイダーの初期化
    AWSCognito.config.region = 'リージョン'; // リージョン
    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: ["IDプール設定"]
    });

    // 「Create Account」ボタン押下時
    $("#createAccount").click(function(event) {
        signUp();
    });
});

/**
 * サインアップ処理。
 */
var signUp = function() {

    var username = $("#email").val();
    var password = $("#password").val();

    // 何か1つでも未入力の項目がある場合、処理終了
    if (!username | !password) {
        return false;
    }

    var dataEmail = {
        Name : "email",
        Value : username
    }
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    // サインアップ処理
    userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
            alert(err);
            return;
        } else {
            // サインアップ成功の場合、アクティベーション画面に遷移する
        }
    });
}
