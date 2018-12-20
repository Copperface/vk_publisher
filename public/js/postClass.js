function postClass() {
    let _message = () => {
        return $('.message').val();
    };
    let _media = () => {
        return _parseMediaURL($('.media').val());
    };
    let _targets = () => {
        return $('.targets').val().split('\n');
    };


    function _parseMediaURL(input) {
        let _arrURL = input.split('\n');
        for (let i = 0; i < _arrURL.length; i++) {
            _arrURL[i] = _arrURL[i].substring(_arrURL[i].search('photo'), _arrURL[i].length);
            let b = ~_arrURL[i].search(/\W/);
            if (b) {
                _arrURL[i] = _arrURL[i].substring(0, b);
            };
        }
        return _arrURL;
    }

    this.sendPost = async function () {
        let _data = {
            message: _message(),
            media: _media(),
            targets: _targets()
        };
        let _result = {};
        let i = 0;
        let timerId = await setTimeout(async function next() {
            let _response = await $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: {
                    method: 'wall.post',
                    data: {
                        owner_id: '-' + _data.targets[i],
                        message: _data.message,
                        attachments: _data.media.join(),
                        access_token: token.value(),
                        v: v
                    }

                }
            });
            _result[_data.targets[i]] = !!_response.response.post_id;
            i++;
            if (i < _data.targets.length) {
                timerId = await setTimeout(next, 500);
            } else {
                alert(JSON.stringify(_result, null, ' '));
            }
        }, 500);

    }
}
