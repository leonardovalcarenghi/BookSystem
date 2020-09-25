$(function () {

    // Autenticação:
    var auth = GetCookie('Authentication')

    // Verificar se está autenticado:
    var host = window.location.pathname.toLowerCase();
    if (host != "/" && auth == null) { window.location.href = '/'; }

    if (sessionStorage['NotAuthenticated'] == 'true') {
        sessionStorage.removeItem('NotAuthenticated');
        $.toaster({ priority: 'danger', title: 'Sessão Expirada', message: 'Sua sessão foi expirada, por favor faça login novamente.' });
    }

    if (auth != null) { $('#LogoutButton').show(); }


    $('#LogoutButton').click(f => {
        var dialog = confirm('Deseja realmente sair?');
        if (dialog == true) {
            DeleteCookie('Authentication');
            window.location.href = '/';
        }
    })

})