-- Verificar se livro está alugado:
DECLARE @Contador INT
SELECT @Contador = COUNT(Id) FROM RentedBooks WHERE Status = 1 AND BookID = @BookID
IF (@Contador = 1)	BEGIN SELECT 'LIVRO_ALUGADO' RETURN END

-- Livro disponível:
INSERT INTO RentedBooks (BookID, UserID, Status) VALUES (@BookID, @UserID, 1)
