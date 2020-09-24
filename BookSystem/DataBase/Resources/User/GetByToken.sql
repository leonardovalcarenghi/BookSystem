-- Buscar usuário vinculado ao token:
SELECT U.* FROM Users AS U INNER JOIN Tokens AS T ON U.UserID = T.UserID WHERE T.Token = @Token