$(function () {

    // Verificar se está autenticado:
    var host = window.location.pathname.toLowerCase();
    if (host != "/" && GetCookie('Authentication') == null) { window.location.href = '/'; }

    if (sessionStorage['NotAuthenticated'] == 'true') {
        sessionStorage.removeItem('NotAuthenticated');
        $.toaster({ priority: 'danger', title: 'Sessão Expirada', message: 'Sua sessão foi expirada, por favor faça login novamente.' });
    }

})