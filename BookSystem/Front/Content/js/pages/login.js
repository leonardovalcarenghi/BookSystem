$(function () {
    // Redirecionar caso esteja logado:
    if (!(GetCookie('Authentication') == null)) { window.location.href = '/books/'; return }

    // Fazer login:
    $('#LoginButton').click(f => { Login(); });
})

function Login() {

    // Verificar Parâmetros:
    var email = $('#LoginEmailInput').val();
    var password = $('#LoginPasswordInput').val();
    var login = { Email: email, Password: password }
    if (email == '') { $.toaster({ priority: 'danger', title: 'Campo obrigatório', message: 'Digite seu e-mail' }); return; }
    if (password == '') { $.toaster({ priority: 'danger', title: 'Campo obrigatório', message: 'Digite sua senha.' }); return; }

    // Bloquear botão:
    $('#LoginButton').attr('disabled', 'disabled');
    $('#LoginButton span').html('Entrando...');
    $('#LoginButton i').attr('class', 'fas fa-spinner spinner');


    // Chamar API:
    Request('POST', '/user/login', login,
        data => {
            SetCookie('Authentication', data, '1DAY');
            window.location.href = '/books/';
        },
        error => {
            // Notificação:
            $.toaster({ priority: 'danger', title: 'Falha no login', message: error.Message });

            // Desbloquear botão:
            $('#LoginButton').removeAttr('disabled');
            $('#LoginButton span').html('Entrar');
            $('#LoginButton i').attr('class', 'fas fa-sign-in-alt');
        }
    );
}