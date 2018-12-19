function postClass(messageClass, mediaClass, targetsClass) {
    this.message = $(messageClass).val();
    this.media = _parseMediaURL($(mediaClass).val());
    this.targets = $(targetsClass).val().split('\n');


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
}
