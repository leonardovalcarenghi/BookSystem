using BookSystem.DTO;
using BookSystemException;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookSystem.Business
{
    /// <summary>
    /// Usuário
    /// </summary>
    public static class User
    {

        /// <summary>
        /// Login
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        public static void Login(string email, string password)
        {
            try
            {
                // Buscar usuário:
                UserDTO user = Get(email, true);
                if (user == null) { throw new AppException("Nenhum usuário encontrado."); }

                // Verificar senha:
                password = Utils.Hash256(password);
                if (password != user.Password) { throw new AppException("Senha incorreta."); }
            }
            catch (AppException AppEx) { throw AppEx; }
            catch (Exception Ex) { throw Ex; }
        }



        /// <summary>
        /// Obter informações do usuário pelo login (e-mail).
        /// </summary>

        public static UserDTO Get(string email, bool getPassword = false)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (AppException AppEx) { throw AppEx; }
            catch (Exception Ex) { throw Ex; }
        }

        /// <summary>
        /// Obter informações do usuário pelo id do mesmo.
        /// </summary>
        public static UserDTO Get(int id, bool getPassword = false)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (AppException AppEx) { throw AppEx; }
            catch (Exception Ex) { throw Ex; }
        }

        /// <summary>
        /// Criar novo usuário.
        /// </summary>
        public static void New(UserDTO user)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (AppException AppEx) { throw AppEx; }
            catch (Exception Ex) { throw Ex; }
        }

        public static void Delete()
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (AppException AppEx) { throw AppEx; }
            catch (Exception Ex) { throw Ex; }
        }


    }
}
