
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

function GetList() {
    Request('GET', '/books/get', null,
        data => { RenderList(data); },
        error => { alert('Erro ao buscar lista de livros. \n' + error); }
    )
}

function RenderList(list = []) {
    $('#BooksList').html('');

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
        $('#ConfirmRentModal').modal('show');
        $('#ConfirmRentModal .ok').unbind('click').click(f => {
            RentBook(bookId);
        })
    })


}


function RentBook(id) {
    $('#ConfirmRentModal .ok').attr('disabled', 'disabled');
    $('#ConfirmRentModal .ok span').html('Alugando...')

    Request('POST', '/book/rent', id,
        data => {
            alert('Livro alugado com sucesso!');
            GetList();
        },
        error => {
            alert('Erro ao alugar livro: \n' + error);
            $('#ConfirmRentModal .ok').removeAttr('disabled');
            $('#ConfirmRentModal .ok span').html('Alugar')
        }
    )
}







$(function () {

    // Esperar um pouco para poder ver a animação de carregamento:
    setTimeout(f => { GetList(); }, 1000)

})