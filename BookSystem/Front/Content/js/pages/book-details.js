// Obter Informações do Livro //
function GetBook(id = 0) {
    Request('GET', '/book/get/' + id, null,
        data => { ShowInformations(data); },
        error => {
            // Não autenticado:
            if (error.Code == '401') { sessionStorage['NotAuthenticated'] = 'true'; window.location.href = '/'; return; }

            // Notificação:
            $.toaster({ priority: 'danger', title: 'Falha ao buscar informações do livro', message: error.Message });
        }
    )
}

// Exibir Informações do Livro //
function ShowInformations(book = {}) {

    $('#DescriptionSection label').html('Descrição');
    $('#PublisherSection label').html('Editora');
    $('#YearSection label').html('Ano de lançamento');
    $('#PagesSection label').html('Nº de páginas');

    $('#BookCover').attr('src', book.ImageURL);
    $('photo').remove();
    $('#BookAuthor').html(book.Author);
    $('#BookTitle').html(book.Name);
    if (book.Description == '') { $('#DescriptionSection').hide() } else { $('#BookDescription').html(book.Description); }
    if (book.Publisher == '') { $('#PublisherSection').hide() } else { $('#BookPublisher').html(book.Publisher); }
    if (book.Year == '') { $('#YearSection').hide() } else { $('#BookYear').html(book.Year); }
    if (book.Pages == 0) { $('#PagesSection').hide() } else { $('#BookPages').html(book.Pages); }
    if (book.Available == false) {
        $('#RentButton').attr('disabled', 'disabled');
        $('#RentButton span').html('Indisponível');
    }
    $('#OptionsSection').show();
}

// Alugar Livro //
function RentBook(id) {
    // Bloquear botão:
    $('#ConfirmRentModal .ok').attr('disabled', 'disabled');
    $('#ConfirmRentModal .ok span').html('Alugando...')

    Request('POST', '/book/rent', id,
        data => {
            // Notificação:
            $.toaster({ priority: 'success', title: 'Livro Alugado', message: 'O livro foi alugado com êxito' });

            // Fechar modal:
            $('#ConfirmRentModal').modal('hide');

            // Atualizar livro:
            GetBook(id);
        },
        error => {
            // Não autenticado:
            if (error.Code == '401') { sessionStorage['NotAuthenticated'] = 'true'; window.location.href = '/'; return; }

            // Notificação:
            if (error.Code == '409') { $.toaster({ priority: 'danger', title: 'Livro Indisponível', message: 'O livro solicitado já foi alugado.' }); } else {
                $.toaster({ priority: 'danger', title: 'Falha ao alugar o livro', message: error.Message });
            }
           

            // Desbloquear Botão:
            $('#ConfirmRentModal .ok').removeAttr('disabled');
            $('#ConfirmRentModal .ok span').html('Alugar');

            // Fechar modal:
            $('#ConfirmRentModal').modal('hide');
        }
    )
}



$(function () {
    let id = ParameterURL('id');
    if (id == null) { window.location.href = '/books/'; }

    // Esperar um pouco para poder ver a animação de carregamento:
    setTimeout(f => { GetBook(id); }, 1000)


    $('#BackButton').click(f => { window.location.href = '/books/'; });
    $('#RentButton').click(f => {
        $('#ConfirmRentModal').modal('show');
        $('#ConfirmRentModal .ok').unbind('click').click(f => {
            RentBook(id);
        })
    });
})