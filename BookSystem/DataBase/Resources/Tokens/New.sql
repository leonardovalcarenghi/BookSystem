-- Revogar todos os outros tokens do usu�rio:
UPDATE Tokens SET Active = 0 WHERE UserID = @UserID

-- Novo Token:
INSERT INTO Tokens(Active, UserID, ExpirationDate) OUTPUT inserted.Token  VALUES (1, 1, DATEADD( DAY, 1, GETDATE()))