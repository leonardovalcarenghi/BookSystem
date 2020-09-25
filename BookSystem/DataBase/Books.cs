using BookSystem.DTO;
using BookSystemException;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookSystem.DataBase
{
    public class Books
    {
        public static BookDTO Get(int id)
        {
            BookDTO book = null;
            SqlConnection ConnectSQL = new SqlConnection(_DataBase.ConnectionString);
            string SQL = Querys.Books.GetById;

            try
            {
                SqlCommand sqlCommand = new SqlCommand(SQL, ConnectSQL);
                sqlCommand.CommandType = System.Data.CommandType.Text;
                ConnectSQL.Open();
                sqlCommand.Parameters.Add(new SqlParameter("@BookID", id));

                SqlDataReader readDataBase = sqlCommand.ExecuteReader();
                while (readDataBase.Read())
                {
                    book = new BookDTO();
                    book.Id = id;
                    book.Name = readDataBase["Name"].ToString();
                    book.Author = readDataBase["Author"].ToString();
                    book.ImageURL = readDataBase["ImageURL"].ToString();
                    book.Category = readDataBase["Category"].ToString();
                    book.Description = readDataBase["Description"].ToString();
                    book.Pages = readDataBase["Pages"].ToString() != "" ? Convert.ToInt32(readDataBase["Pages"].ToString()) : 0;
                    book.Publisher = readDataBase["Publisher"].ToString();
                    book.Year = readDataBase["Year"].ToString();

                    var obj = readDataBase["Status"].ToString();
                    book.Available = (obj == "" ? true : false);
                }
                return book;
            }
            catch (SqlException sqlEx) { throw sqlEx; }
            finally { ConnectSQL.Close(); }
        }


        public static List<BookDTO> GetAll(string search = "")
        {
            List<BookDTO> listOfBooks = null;
            SqlConnection ConnectSQL = new SqlConnection(_DataBase.ConnectionString);
            string SQL = "SELECT * FROM Books AS B LEFT Join RentedBooks AS R ON B.BookID = R.BookID";
            if (!string.IsNullOrEmpty(search)) { SQL = "SELECT * FROM Books AS B LEFT Join RentedBooks AS R ON B.BookID = R.BookID WHERE B.Name LIKE '%' + @Search +'%'"; }

            try
            {
                SqlCommand sqlCommand = new SqlCommand(SQL, ConnectSQL);
                sqlCommand.CommandType = System.Data.CommandType.Text;
                ConnectSQL.Open();
                if (!string.IsNullOrEmpty(search)) { sqlCommand.Parameters.Add(new SqlParameter("@Search", search)); }

                SqlDataReader readDataBase = sqlCommand.ExecuteReader();
                while (readDataBase.Read())
                {
                    if (listOfBooks == null) { listOfBooks = new List<BookDTO>(); }
                    BookDTO book = new BookDTO();
                    book.Id = Convert.ToInt32(readDataBase["BookID"].ToString());
                    book.Name = readDataBase["Name"].ToString();
                    book.Author = readDataBase["Author"].ToString();
                    book.ImageURL = readDataBase["ImageURL"].ToString();
                    book.Category = readDataBase["Category"].ToString();
                    book.Description = readDataBase["Description"].ToString();
                    book.Pages = readDataBase["Pages"].ToString() != "" ? Convert.ToInt32(readDataBase["Pages"].ToString()) : 0;
                    book.Publisher = readDataBase["Publisher"].ToString();
                    book.Year = readDataBase["Year"].ToString();

                    var obj = readDataBase["Status"].ToString();
                    book.Available = (obj == "" ? true : false);

                    listOfBooks.Add(book);
                }
                return listOfBooks;
            }
            catch (SqlException sqlEx) { throw sqlEx; }
            finally { ConnectSQL.Close(); }
        }

        public static void Rent(int id, int userId)
        {
            SqlConnection ConnectSQL = new SqlConnection(_DataBase.ConnectionString);
            string SQL = Querys.Books.Rent;

            try
            {
                SqlCommand sqlCommand = new SqlCommand(SQL, ConnectSQL);
                sqlCommand.CommandType = System.Data.CommandType.Text;
                ConnectSQL.Open();
                sqlCommand.Parameters.Add(new SqlParameter("@BookID", id));
                sqlCommand.Parameters.Add(new SqlParameter("@UserID", userId));

                object response = sqlCommand.ExecuteScalar();

                if (response != null && response.ToString() == "LIVRO_ALUGADO") { throw new AppException("O livro solicitado já está alugado."); }
            }
            catch (SqlException sqlEx) { throw sqlEx; }
            finally { ConnectSQL.Close(); }
        }


    }
}
