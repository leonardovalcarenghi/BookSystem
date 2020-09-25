-- Revogar todos os outros tokens do usuário:
UPDATE Tokens SET Active = 0 WHERE UserID = @UserID

-- Novo Token:
INSERT INTO Tokens(Active, UserID, ExpirationDate) OUTPUT inserted.Token  VALUES (1, @UserID, DATEADD( DAY, 1, GETDATE()))