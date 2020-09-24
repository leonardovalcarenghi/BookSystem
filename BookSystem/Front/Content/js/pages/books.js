
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
                        <span>Alugar</span>
                    </button>
                </div>
            </div>
        </div>
    </div>`

function GetList() {
    Request('GET', '/books/get', null)
        .Success(data => {
            RenderList(data);
        })
        .Error(error => {
            alert('Erro ao buscar lista de livros. \n' + error);
        })
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
        $('#BooksList').append(html);
    });


    // Visualizar Detalhes do Livro:
    $('.book-item .details').click(e => {
        var bookId = $(e.target).closest('.book-item').attr('book-id');
        window.location.href = 'details?id=' + bookId;
    })

    // Alugar Livro:
    $('.book-item .rent').click(e => {
        var bookId = $(e.target).closest('.book-item').attr('book-id');
        $('#ConfirmRentModal').modal('show');
    })


}







$(function () {
    GetList();
})