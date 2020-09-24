function GetBook(id = 0) {
    Request('GET', '/book/get/' + id, null)
        .Success(data => {
            ShowInformations(data);
        })
        .Error(error => {
            alert('Erro ao buscar dados do livro \n' + error);
        })
}


function ShowInformations(book = {}) {
    $('#BookCover').attr('src', book.ImageURL);
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


}

$(function () {
    let id = ParameterURL('id');
    if (id == null) { window.location.href = '/books/'; }
    GetBook(id);

    $('#BackButton').click(f => { window.location.href = '/books/'; });
    $('#RentButton').click(f => {
        $('#ConfirmRentModal').modal('show');
    });
})