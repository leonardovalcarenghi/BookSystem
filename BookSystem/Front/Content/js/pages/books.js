// Componente //
var component =
    `<div class="row book-item" book-id="[ID]">
        <div class="col-md-1">
            <img src="[IMAGEM]" />
        </div>
        <div class="col-md-11">
            <div class="row mt-4">
                <div class="col-md-8">
                    <h5>
                        <small id="BookAuthor">[AUTOR]</small>
                        <span id="BookTitle">[LIVRO]</span>
                    </h5>
                </div>
                <div class="col-md-4 mt-2">
                    <button type="button" class="btn btn-outline-info float-right details">Detalhes</button>
                    <button type="button" class="btn [CLASS] float-right mr-2 px-3 rent" [AVAILABLE]>
                        <i class="[ICON] mr-1"></i>
                        <span>[TEXTO]</span>
                    </button>
                </div>
            </div>
        </div>
    </div>`

// Lista de livro:
var ListOfBooks = []

// Obter lista de livros //
function GetList() {
    $('#SearchButton').attr('disabled', 'disabled');
    let search = $('#SearchInput').val();
    Request('POST', '/books/get', search,
        data => {
            RenderList(data);
        },
        error => {
            // Notificação:
            $.toaster({ priority: 'danger', title: 'Falha ao buscar lista de livros.', message: error.Message });

            // Botão de Buscar:
            $('#SearchButton i').attr('class', 'fas fa-search');
            $('#SearchButton').removeAttr('disabled');
        }
    )
}

// Renderizar Lista //
function RenderList(list = []) {
    $('#BooksList').html('');
    $('#SearchButton i').attr('class', 'fas fa-search');
    $('#SearchButton').removeAttr('disabled');

    // Nenhum resultado encontrado:
    if (list == null) { $('#BooksList').html('<label>Nenhum resultado encontrado...</label>'); return; }

    ListOfBooks = list;

    list.forEach(BOOK => {
        let html = component;
        html = html.replace('[ID]', BOOK.Id);
        html = html.replace('[IMAGEM]', BOOK.ImageURL);
        html = html.replace('[AUTOR]', BOOK.Author);
        html = html.replace('[LIVRO]', BOOK.Name);


        // Verificar se o usuário atual alugou o livro:
        if (!BOOK.Available && BOOK.RentedByMe) {
            html = html.replace('[AVAILABLE]', '');
            html = html.replace('[TEXTO]', 'Devolver');
            html = html.replace('[ICON]', 'fas fa-share');
        }

        html = html.replace('[AVAILABLE]', (BOOK.Available == false ? 'disabled="disabled"' : ''));
        html = html.replace('[TEXTO]', (BOOK.Available == false ? 'Indisponível' : 'Alugar'));
        html = html.replace('[CLASS]', (BOOK.RentedByMe == false || BOOK.RentedByMe == null ? 'btn-primary' : 'btn-success'));
        html = html.replace('[ICON]', 'fas fa-shopping-cart');

        $('#BooksList').append(html);
    });

    // Visualizar Detalhes do Livro:
    $('.book-item .details').click(e => {
        var bookId = $(e.target).closest('.book-item').attr('book-id');
        window.location.href = '/books/details?id=' + bookId;
    })

    // Alugar Livro:
    $('.book-item .rent').click(e => {
        var bookId = $(e.target).closest('.book-item').attr('book-id');

        var book = ListOfBooks.find(x => x.Id == bookId);

        // Devolver:
        if (!book.Available) { GiveBack(bookId); return; }


        // Montar informações do livro na modal:
        $('#ConfirmRentModal img').attr('src', book.ImageURL);
        $('#ConfirmRentModal p[name="BookName"]').html(book.Name);
        $('#ConfirmRentModal p[name="BookAuthor"]').html(book.Author);
        $('#ConfirmRentModal p[name="BookYear"]').html(book.Year);


        $('#ConfirmRentModal').modal('show');
        $('#ConfirmRentModal .ok').unbind('click').click(f => { RentBook(bookId); })
    })

}

// Alugar Livro //
function RentBook(id) {
    // Bloquear botão:
    $('#ConfirmRentModal .ok').attr('disabled', 'disabled');
    $('#ConfirmRentModal .ok span').html('Alugando...');
    $('#ConfirmRentModal .ok i').attr('class', 'fas fa-spinner spinner');

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

            // Atualizar lista:
            GetList();
        },
        error => {
            // Notificação:
            if (error.Code == '409') { $.toaster({ priority: 'danger', title: 'Livro Indisponível', message: 'O livro solicitado já foi alugado.' }); } else {
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
    var rowBook = $(`.book-item[book-id=${id}]`);
    rowBook.find('.rent').attr('disabled', 'disabled');
    rowBook.find('.rent i').attr('class', 'fas fa-spinner spinner');
    rowBook.find('.rent span').html('Devolvendo...');

    Request('POST', '/book/giveback', id,
        data => {
            // Notificação:
            $.toaster({ priority: 'success', title: 'Livro Devolvido', message: 'O livro foi devolvido com êxito.' });

            // Atualizar lista:
            GetList();
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
    // Esperar um pouco para poder ver a animação de carregamento:
    setTimeout(f => { GetList(); }, 1000);

    // Botão de Pesquisar:
    $('#SearchButton').click(f => {
        $('#SearchButton i').attr('class', 'fas fa-spinner spinner');
        setTimeout(f => { GetList(); }, 1000)
    });
})