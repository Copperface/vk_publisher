var token = new tokenClass();
var clientId = 6782835;
var v = '5.92';
var url = 'https://api.vk.com/method/wall.post';
var messageFieldClass = '.message';
var mediaFieldClass = '.media';
var targetsFieldClass = '.targets';


window.onload = async function () {
    VK.init({
        apiId: '6780918'
    });
    if (await token.getFromLocalStrorage()) {
        authUI();
    }
}

async function readToken() {
    if (await token.read()) {
        token.saveToLocalStorage();
        authUI();
    }
}

function authUI() {
    $('.auth-button').removeClass('fail').addClass('success disabled').text('Вы авторизованны');
    $('.read-button').addClass('hide');
    $('.input').removeClass('hide');
}

async function sendPost() {
    let post = new postClass(messageFieldClass, mediaFieldClass, targetsFieldClass);
    let result = {};
    for (let i = 0; i < post.targets.length; i++) {
        let _response = await $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: {
                owner_id: '-' + post.targets[i],
                message: post.message,
                attachments: post.media.join(),
                access_token: token.value(),
                v: v
            }
        });
        result[post.targets[i]] = !!_response.response.post_id;
    }
    alert(JSON.stringify(result, null, ' '));
}

function callback(response) {
    console.log(response);
}

function auth() {
    VK.Auth.login(callback,8192);
}

function test() {
    VK.Api.call('wall.post', {owner_id: '-175229206',message: $('.message').val(), v: v}, callback);
}