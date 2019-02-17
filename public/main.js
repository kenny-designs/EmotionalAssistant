$(function() {
    let $window = $(window);
    let $usernameInput = $('.usernameInput');
    let $messages = $('.messages');
    let $inputMessage = $('.inputMessage');
    let $loginView = $('.login.view');
    let $chatView = $('.chat.view');
    let $currentInput = $usernameInput.focus();

    let username = 'Test Name';
    let connected = false;

    const setUsername = () => {
        $loginView.fadeOut();
        $chatView.show();
        $loginView.off('click');
        $currentInput = $inputMessage.focus();
        socket.emit('add user', username);
    };

    $window.onkeydown(event => {
        if(event.which === 13) {
            setUsername();
        }
    });

    const sendMessage = () => {
        let message = $inputMessage.val();

        if(message && connected) {
            $inputMessage.val('');
            addChatMessage({
                username: username,
                message: message
            });
            socket.emit('new message', message);
        }
    }

    const addChatMessage = (data, options) => {

    }
});
