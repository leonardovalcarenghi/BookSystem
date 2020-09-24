using BookSystem.DTO;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookSystem.DataBase
{
    public static class User
    {

        public static UserDTO Get(int id)
        {
            UserDTO user = null;
            SqlConnection ConnectSQL = new SqlConnection(_DataBase.ConnectionString);
            string SQL = Querys.User.GetByEmail;

            try
            {
                SqlCommand sqlCommand = new SqlCommand(SQL, ConnectSQL);
                sqlCommand.CommandType = System.Data.CommandType.Text;
                ConnectSQL.Open();
                sqlCommand.Parameters.Add(new SqlParameter("@UserID", id));

                SqlDataReader readDataBase = sqlCommand.ExecuteReader();
                while (readDataBase.Read())
                {
                    user = new UserDTO();
                    user.Id = id;
                    user.Name = readDataBase["Name"].ToString();
                    user.Email = readDataBase["Email"].ToString();
                    user.Password = readDataBase["Password"].ToString();
                }
                return user;
            }
            catch (SqlException sqlEx) { throw sqlEx; }
            finally { ConnectSQL.Close(); }

        }

        public static UserDTO Get(string email)
        {
            UserDTO user = null;
            SqlConnection ConnectSQL = new SqlConnection(_DataBase.ConnectionString);
            string SQL = Querys.User.GetByEmail;

            try
            {
                SqlCommand sqlCommand = new SqlCommand(SQL, ConnectSQL);
                sqlCommand.CommandType = System.Data.CommandType.Text;
                ConnectSQL.Open();
                sqlCommand.Parameters.Add(new SqlParameter("@UserEmail", email));

                SqlDataReader readDataBase = sqlCommand.ExecuteReader();
                while (readDataBase.Read())
                {
                    user = new UserDTO();
                    user.Id = Convert.ToInt32(readDataBase["UserID"].ToString());
                    user.Name = readDataBase["Name"].ToString();
                    user.Email = readDataBase["Email"].ToString();
                    user.Password = readDataBase["Password"].ToString();
                }
                return user;
            }
            catch (SqlException sqlEx) { throw sqlEx; }
            finally { ConnectSQL.Close(); }


        }
    }
}
