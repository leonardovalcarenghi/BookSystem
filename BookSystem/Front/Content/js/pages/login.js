


$(function () {
    $('#LoginButton').click(f => {

        $('#LoginModal').modal('show');
        $('#LoginModal .login').unbind('click').click(f => {
            var email = $('#LoginEmailInput').val();
            var password = $('#LoginPasswordInput').val();

            if (email == '') { alert('Digite seu e-mail.'); return; }
            if (password == '') { alert('Digite sua senha.'); return; }

            Login(email, password);
        })



    })
})


function Login(email, password) {
    $('#LoginModal .login').html('Entrando...').attr('disabled', 'disabled');
    var login = { Email: email, Password: password }
    Request('POST', '/user/login', login,
        data => {
            SetCookie('Authentication', data, '1DAY');
            window.location.href = '/books/';
        },
        error => {
            $('#LoginModal .login').html('Login').removeAttr('disabled');
            alert(error);
        });
}