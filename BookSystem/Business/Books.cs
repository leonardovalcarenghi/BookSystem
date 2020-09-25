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
                BookDTO book = BookSystem.DataBase.Books.Get(id);
                return book;
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
        public static void Rent(int id)
        {
            try
            {
                if (id == 0) { throw new AppException("Identificador do livro não foi recebido."); }
                DataBase.Books.Rent(id, User.Id);
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
                List<BookDTO> listOfBooks = BookSystem.DataBase.Books.GetAll();
                return listOfBooks;
            }
            catch (AppException AppEx) { throw AppEx; }
            catch (Exception Ex) { throw Ex; }
        }
    }
}
