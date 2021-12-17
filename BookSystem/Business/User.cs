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
        /// Id do usuário (Depois de autenticado)
        /// </summary>
        public static int Id { get; set; }

        /// <summary>
        /// Nome do usuário (Depois de autenticado)
        /// </summary>
        public static string Name { get; set; }

        /// <summary>
        /// Email do usuário (Depois de autenticado)
        /// </summary>

        public static string Email { get; set; }

        /// <summary>
        /// Login
        /// </summary>
        public static string Login(string email, string password)
        {
            try
            {
                // Buscar usuário:
                UserDTO user = Get(email, true);
                if (user == null) { throw new AppException("Nenhum usuário encontrado."); }

                // Verificar senha:
                password = Utils.Hash256(password);
                if (password != user.Password) { throw new AppException("Senha incorreta."); }

                // Gerar novo token:
                string token = Authentication.NewToken(user.Id);
                return token;
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
                if (string.IsNullOrEmpty(email)) { throw new AppException("E-mail do usuário não fornecido."); }
                UserDTO user = BookSystem.DataBase.User.Get(email);
                if (!getPassword) { user.Password = null; }
                return user;
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
                if (id == 0) { throw new AppException("Identificador do usuário não fornecido."); }
                UserDTO user = BookSystem.DataBase.User.Get(id);
                if (!getPassword) { user.Password = null; }
                return user;
            }
            catch (AppException AppEx) { throw AppEx; }
            catch (Exception Ex) { throw Ex; }
        }


        /// <summary>
        /// Buscar usuário vinculado ao token.
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public static UserDTO GetByToken(string token)
        {
            try
            {
                if (string.IsNullOrEmpty(token)) { throw new AppException("Token do usuário não foi informado."); }
                UserDTO user = BookSystem.DataBase.User.GetByToken(token);
                user.Password = null;
                return user;
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
