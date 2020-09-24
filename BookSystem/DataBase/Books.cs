using BookSystem.DTO;
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
            string SQL = "SELECT * FROM Books WHERE BookID = @BookID";

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
                    book.Pages = Convert.ToInt32(readDataBase["Pages"].ToString());
                    book.Publisher = readDataBase["Publisher"].ToString();
                    book.Year = readDataBase["Year"].ToString();
                }
                return book;
            }
            catch (SqlException sqlEx) { throw sqlEx; }
            finally { ConnectSQL.Close(); }
        }


        public static List<BookDTO> GetAll()
        {
            List<BookDTO> listOfBooks = null;
            SqlConnection ConnectSQL = new SqlConnection(_DataBase.ConnectionString);
            string SQL = "SELECT * FROM Books";

            try
            {
                SqlCommand sqlCommand = new SqlCommand(SQL, ConnectSQL);
                sqlCommand.CommandType = System.Data.CommandType.Text;
                ConnectSQL.Open();
           
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
                    book.Pages = Convert.ToInt32(readDataBase["Pages"].ToString()); 
                    book.Publisher = readDataBase["Publisher"].ToString();
                    book.Year = readDataBase["Year"].ToString();
                    listOfBooks.Add(book);
                }
                return listOfBooks;
            }
            catch (SqlException sqlEx) { throw sqlEx; }
            finally { ConnectSQL.Close(); }
        }

    }
}
