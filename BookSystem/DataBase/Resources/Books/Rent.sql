-- Verificar se livro est� alugado:
DECLARE @Contador INT
SELECT @Contador = COUNT(Id) FROM RentedBooks WHERE Status = 1 AND BookID = @BookID
IF (@Contador = 1)	BEGIN SELECT 'LIVRO_ALUGADO' RETURN END

-- Livro dispon�vel:
INSERT INTO RentedBooks (BookID, UserID, Status) VALUES (@BookID, @UserID, 1)
