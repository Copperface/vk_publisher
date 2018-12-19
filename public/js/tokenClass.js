function tokenClass() {
    let _value = null;
    let _checkTokenURL = 'https://api.vk.com/method/secure.checkToken';
    let _serviceToken = '4d1a0ac64d1a0ac64d1a0ac65a4d7d7d3044d1a4d1a0ac6110ac7b22bd49a7b06a7bda0';

    this.value = function () {
        return _value;
    };

    this.saveToLocalStorage = function () {
        localStorage.setItem('access_token', _value);
    };

    this.getFromLocalStrorage = async function () {
        _value = localStorage.getItem('access_token');
        return await this.checkToken();;
    };

    this.read = async function () {
        let _url_string = prompt('Введите полученную ссылку:', '');
        if (_url_string) {
            _url_string = _url_string.replace('#', '?');
            let _url = new URL(_url_string);
            _value = _url.searchParams.get('access_token');
            console.log(_value);
            if (_value) {
                if (await this.checkToken()) {
                    alert('Вы авторизованны!');
                    return true;
                } else {
                    alert('Вы ввели неверные данные!(check-fail)');
                    return false;
                }
            } else {
                alert('Вы ввели неверные данные!(token-fail)');
                return false;
            }
        } else {
            alert('Вы ввели неверные данные!(token-null)');
            return false;
        }

    };

    this.checkToken = async function () {
        let _response;
        if (_value) {
            _response = await $.ajax({
                url: _checkTokenURL,
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    access_token: _serviceToken,
                    token: _value,
                    v: v
                }
            });
            return !!_response.response.success;
        } else {
            return false;
        }
    };
}
