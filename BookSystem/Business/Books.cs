using BookSystem.DTO;
using BookSystemException;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookSystem.Business
{
    public static class Books
    {

        /// <summary>
        /// Buscar informações do livro pelo id.
        /// </summary>
        public static BookDTO Get(int id)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (AppException AppEx) { throw AppEx; }
            catch (Exception Ex) { throw Ex; }
        }

        /// <summary>
        /// Alugar livro.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static void Rent(int id, int userId)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (AppException AppEx) { throw AppEx; }
            catch (Exception Ex) { throw Ex; }
        }


        /// <summary>
        /// Buscar lista de todos os livros disponíveis.
        /// </summary>
        public static List<BookDTO> GetAll()
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
