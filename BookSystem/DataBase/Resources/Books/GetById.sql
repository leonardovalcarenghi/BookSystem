-- Buscar informações do livro solicitado:
SELECT B.*, R.Status, R.UserID AS [RentedBy] FROM Books AS B LEFT Join RentedBooks AS R ON B.BookID = R.BookID WHERE B.BookID = @BookID