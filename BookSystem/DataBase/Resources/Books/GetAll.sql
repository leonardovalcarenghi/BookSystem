
-- Buscar todos os livros (sem filtro):
	IF @Search IS NULL	BEGIN	SELECT B.*, R.Status, R.UserID AS [RentedBy] FROM Books AS B LEFT Join RentedBooks AS R ON B.BookID = R.BookID	END
	ELSE
-- Buscar livros com filtro:
	BEGIN SELECT B.*, R.Status, R.UserID AS [RentedBy] FROM Books AS B LEFT Join RentedBooks AS R ON B.BookID = R.BookID WHERE B.Name LIKE '%' + @Search +'%' END