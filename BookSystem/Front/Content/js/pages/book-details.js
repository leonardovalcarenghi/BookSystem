function GetBook(id = 0) {
    Request('GET', '/book/get/' + id, null,
        data => { ShowInformations(data); },
        error => { alert('Erro ao buscar dados do livro \n' + error); }
    )
}


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


function RentBook(id) {
    $('#ConfirmRentModal .ok').attr('disabled', 'disabled');
    $('#ConfirmRentModal .ok span').html('Alugando...')

    Request('POST', '/book/rent', id,
        data => {
            alert('Livro alugado com sucesso!');
            GetBook(id);
            $('#ConfirmRentModal').modal('hide');
        },
        error => {
            alert('Erro ao alugar livro: \n' + error);
            $('#ConfirmRentModal .ok').removeAttr('disabled');
            $('#ConfirmRentModal .ok span').html('Alugar')
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