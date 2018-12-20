var clientId = 6782835;
var v = '5.92';
var url = '/api';
var post = new postClass();
var token = new tokenClass();


window.onload = async function () {
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
