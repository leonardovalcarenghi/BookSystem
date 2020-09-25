using BookSystem.DTO;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookSystem.DataBase
{
    public static class Tokens
    {

        public static string New(int userId)
        {
            SqlConnection ConnectSQL = new SqlConnection(_DataBase.ConnectionString);
            string SQL = Querys.Tokens.New;

            try
            {
                SqlCommand sqlCommand = new SqlCommand(SQL, ConnectSQL);
                sqlCommand.CommandType = System.Data.CommandType.Text;
                ConnectSQL.Open();
                sqlCommand.Parameters.Add(new SqlParameter("@UserID", userId));

                object token = sqlCommand.ExecuteScalar();
                return token.ToString();

            }
            catch (SqlException sqlEx) { throw sqlEx; }
            finally { ConnectSQL.Close(); }
        }

        public static TokenDTO Get(string tokenguid)
        {
            TokenDTO token = null;
            SqlConnection ConnectSQL = new SqlConnection(_DataBase.ConnectionString);
            string SQL = Querys.Tokens.Get;

            try
            {
                SqlCommand sqlCommand = new SqlCommand(SQL, ConnectSQL);
                sqlCommand.CommandType = System.Data.CommandType.Text;
                ConnectSQL.Open();
                sqlCommand.Parameters.Add(new SqlParameter("@Token", tokenguid));

                SqlDataReader readDataBase = sqlCommand.ExecuteReader();
                while (readDataBase.Read())
                {
                    token = new TokenDTO();
                    token.Token = tokenguid;
                    token.UserId = Convert.ToInt32(readDataBase["UserID"].ToString());
                    token.IsValid = bool.Parse(readDataBase["Active"].ToString());
                    token.ExpirationDate = DateTime.Parse(readDataBase["ExpirationDate"].ToString());           
                }
                return token;
            }
            catch (SqlException sqlEx) { throw sqlEx; }
            finally { ConnectSQL.Close(); }
        }

    }
}
