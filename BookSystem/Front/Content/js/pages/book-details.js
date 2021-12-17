// Livro carregado:
var Book = {}

// Obter Informações do Livro //
function GetBook(id = 0) { 
    Request('GET', '/book/get/' + id, null,
        data => { Book = data; ShowInformations(data); },
        error => {
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

        // Verificar se o usuário atual alugou o livro:
        if (!book.Available && book.RentedByMe) {
            $('#RentButton').attr('class', 'btn btn-success float-right mr-2 px-4');
            $('#RentButton span').html('Devolver');
            $('#RentButton i').attr('class', 'fas fa-share mr-1');

        } else {
            $('#RentButton').attr('disabled', 'disabled');
            $('#RentButton span').html('Indisponível');
        }

    } else {
        $('#RentButton').removeAttr('disabled');
        $('#RentButton').attr('class', 'btn btn-primary float-right mr-2 px-4');
        $('#RentButton i').attr('class', 'fas fa-shopping-cart mr-1');
        $('#RentButton span').html('Alugar');
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


            // Desbloquear Botão:
            $('#ConfirmRentModal .ok').removeAttr('disabled');
            $('#ConfirmRentModal .ok span').html('Confirmar');
            $('#ConfirmRentModal .ok i').attr('class', 'fas fa-shopping-cart mr-1');

            // Atualizar livro:
            GetBook(id);
        },
        error => {
            // Notificação:
            if (error.Code == '409') { $.toaster({ priority: 'danger', title: 'Livro Indisponível', message: 'O livro solicitado já foi alugado.' }); GetBook(id); } else {
                $.toaster({ priority: 'danger', title: 'Falha ao alugar o livro', message: error.Message });
            }

            // Desbloquear Botão:
            $('#ConfirmRentModal .ok').removeAttr('disabled');
            $('#ConfirmRentModal .ok span').html('Confirmar');
            $('#ConfirmRentModal .ok i').attr('class', 'fas fa-shopping-cart mr-1');

            // Fechar modal:
            $('#ConfirmRentModal').modal('hide');
        }
    )
}

// Devolver Livro //
function GiveBack(id) {
    $('#RentButton').attr('disabled', 'disabled');
    $('#RentButton i').attr('class', 'fas fa-spinner spinner');
    $('#RentButton span').html('Devolvendo...');

    Request('POST', '/book/giveback', id,
        data => {
            // Notificação:
            $.toaster({ priority: 'success', title: 'Livro Devolvido', message: 'O livro foi devolvido com êxito.' });

            // Atualizar lista:
            GetBook(id);
        },
        error => {
            // Notificação:
            $.toaster({ priority: 'danger', title: 'Falha ao devolver o livro', message: error.Message });

            // Desbloquear Botão:
            rowBook.find('.rent').removeAttr('disabled');
            rowBook.find('.rent i').attr('class', 'fas fa-share mr-1');
            rowBook.find('.rent span').html('Devolver');
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

        // Devolver:
        if (!Book.Available) { GiveBack(id); return; }

        // Montar informações do livro na modal:
        $('#ConfirmRentModal img').attr('src', Book.ImageURL);
        $('#ConfirmRentModal p[name="BookName"]').html(Book.Name);
        $('#ConfirmRentModal p[name="BookAuthor"]').html(Book.Author);
        $('#ConfirmRentModal p[name="BookYear"]').html(Book.Year);

        $('#ConfirmRentModal').modal('show');
        $('#ConfirmRentModal .ok').unbind('click').click(f => { RentBook(id); })
    });
})