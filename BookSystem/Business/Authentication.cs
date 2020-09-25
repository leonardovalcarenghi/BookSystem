using BookSystem.DTO;
using BookSystemException;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BookSystem.Business
{
    /// <summary>
    /// Autenticação.
    /// </summary>
    public class Authentication
    {

        public static void ValidateToken()
        {
            try
            {
                string authenticationToken = HttpContext.Current.Request.Headers["Authentication"];
                if (string.IsNullOrEmpty(authenticationToken)) { throw new AppException("Usuário não autenticado.", "401"); }

                // Buscar token e validar:
                TokenDTO token = BookSystem.DataBase.Tokens.Get(authenticationToken);
                if (token == null) { throw new AppException("Token não encontrado.", "401"); }
                if (!token.IsValid) { throw new AppException("O token informado não é mais válido.", "401"); }
                if (DateTime.Now > token.ExpirationDate) { throw new AppException("Sua sessão expirou.", "401"); }

                // Buscar usuário vinculado ao token:
                UserDTO user = User.GetByToken(authenticationToken);
                User.Id = user.Id;
                User.Name = user.Name;
                User.Email = user.Email;

            }
            catch (AppException AppEx) { throw AppEx; }
            catch (Exception Ex) { throw Ex; }
        }

        /// <summary>
        /// Gerar novo token para o usuário
        /// </summary>
        /// <param name="userId"></param>
        public static string NewToken(int userId)
        {
            try
            {
                string token = BookSystem.DataBase.Tokens.New(userId);
                if (string.IsNullOrEmpty(token)) { throw new AppException("O token de acesso não pode ser gerado.", "401"); }
                return token;
            }
            catch (AppException AppEx) { throw AppEx; }
            catch (Exception Ex) { throw Ex; }
        }




    }
}
