
-- Buscar todos os livros (sem filtro):
	IF @Search IS NULL	BEGIN	SELECT B.*, R.Status, R.UserID AS [RentedBy] FROM Books AS B LEFT Join RentedBooks AS R ON B.BookID = R.BookID ORDER BY B.Name ASC	END
	ELSE
-- Buscar livros com filtro:
	BEGIN SELECT B.*, R.Status, R.UserID AS [RentedBy] FROM Books AS B LEFT Join RentedBooks AS R ON B.BookID = R.BookID WHERE B.Name LIKE '%' + @Search +'%' ORDER BY B.Name ASC END