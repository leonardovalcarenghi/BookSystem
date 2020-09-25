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
                    <button type="button" class="btn btn-primary float-right mr-2 px-3 rent" [AVAILABLE]>
                        <i class="fas fa-shopping-cart mr-1"></i>
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
            // Não autenticado:
            if (error.Code == '401') { sessionStorage['NotAuthenticated'] = 'true'; window.location.href = '/'; return; }

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
        html = html.replace('[AVAILABLE]', (BOOK.Available == false ? 'disabled="disabled"' : ''));
        html = html.replace('[TEXTO]', (BOOK.Available == false ? 'Indisponível' : 'Alugar'));
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

        var book = ListOfBooks.find(x => x.Id = bookId);
        console.log('book', book);

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
            // Não autenticado:
            if (error.Code == '401') { sessionStorage['NotAuthenticated'] = 'true'; window.location.href = '/'; return; }

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

$(function () {
    // Esperar um pouco para poder ver a animação de carregamento:
    setTimeout(f => { GetList(); }, 1000);

    // Botão de Pesquisar:
    $('#SearchButton').click(f => {
        $('#SearchButton i').attr('class', 'fas fa-spinner spinner');
        setTimeout(f => { GetList(); }, 1000)
    });
})