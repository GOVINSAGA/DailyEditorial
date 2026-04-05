using DailyBytesDataAccessLayer.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace DailyBytesDataAccessLayer
{
    public class DailyBytesRepository
    {
        private readonly DailyBytesDbContext dailyBytesContext;

        public DailyBytesRepository(DailyBytesDbContext context)
        {
            this.dailyBytesContext = context;
        }

        public List<User> GetAllUsers()
        {
            var users = new List<User>();
            users = dailyBytesContext.Users.ToList();

            return users;
        }

        public List<Role> GetRoles()
        {
            var roles = dailyBytesContext.Roles.ToList();

            return roles;
        }

        public bool RegisterUserUsingUSP(string fName, string lName, string username,
            string email, string password, string cnfPassword, string gender,
            string contactNo, string address, DateTime dateOfBirth, string membershipType, int roleId = 1)
        {
            bool status = false;
            int returnResult = 0;
            Console.WriteLine("DateofBirth :  " + dateOfBirth);
            string dob = dateOfBirth.ToString("yyyy-MM-dd");
            Console.WriteLine("DOB :  " + dob);
            try
            {
                SqlParameter prmFName = new SqlParameter("@FirstName", fName);
                SqlParameter prmLName = new SqlParameter("@LastName", lName);
                SqlParameter prmUserName = new SqlParameter("@Username", username);
                SqlParameter prmEmail = new SqlParameter("@Email", email);
                SqlParameter prmPassword = new SqlParameter("@Password", password);
                SqlParameter prmCnfPass = new SqlParameter("@ConfirmPassword", cnfPassword);
                SqlParameter prmGender = new SqlParameter("@Gender", gender);
                SqlParameter prmContactNo = new SqlParameter("@ContactNumber", contactNo);
                SqlParameter prmAddress = new SqlParameter("@Address", address);
                SqlParameter prmDateOfBirth = new SqlParameter("@DateOfBirth", dob);
                SqlParameter prmRoleId = new SqlParameter("@RoleId", roleId);
                SqlParameter prmMembershipType = new SqlParameter("@MembershipType", membershipType);

                SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
                prmReturnResult.Direction = System.Data.ParameterDirection.Output;

                dailyBytesContext.Database.ExecuteSqlRaw("EXEC {0} = usp_RegisterUser {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}, {10}, {11}, {12}",
                    prmReturnResult, prmFName, prmLName, prmUserName, prmEmail, prmPassword, prmCnfPass, prmGender, prmContactNo,
                    prmDateOfBirth, prmAddress, prmRoleId, prmMembershipType);

                Console.WriteLine("ReturnResult 1 =>" + prmReturnResult);
                returnResult = Convert.ToInt32(prmReturnResult.Value);
                Console.WriteLine("Return Result : " + returnResult);

                if (returnResult == 1)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                status = false;
            }
            return status;
        }


        public LoginDto ValidateLogin(string emailIdOrUserName, string password)
        {
            try
            {
                var currentUser = dailyBytesContext.Users.Where(u => u.Email == emailIdOrUserName && u.Password == password || u.Username == emailIdOrUserName && u.Password == password).
                   Select(u => new LoginDto
                   {
                       EmailId = u.Email,
                       UserId = u.UserId,
                       UserName = u.Username,
                       RoleId = u.RoleId
                   }).FirstOrDefault();
                return currentUser;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

        }

        public bool Logout(int userId)
        {

            try
            {
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public List<AllPublishedArticleDto> GetAllPublishedArticles()
        {
            List<AllPublishedArticleDto> lstArticles = new List<AllPublishedArticleDto>();

            try
            {
                lstArticles = dailyBytesContext.AllPublishedArticlesDto
                    .FromSqlInterpolated($"SELECT * FROM ufn_GetAllPublishedArticles()").ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                lstArticles = null;
            }
            return lstArticles;
        }

        public Article ViewArticlesById(byte articleId)
        {
            Article article = new Article();
            try
            {
                article = dailyBytesContext.Articles
                   .Where(a => a.ArticleId == articleId)
                   .FirstOrDefault();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                article = null;
            }
            return article;
        }

        public List<Article> SearchArticlesByKeyword(string keyword)
        {
            try
            {
                keyword = keyword.ToLower();

                return dailyBytesContext.Articles
                       .Where(a =>
                       a.Headline.ToLower().Contains(keyword) ||
                       a.SubHeading.ToLower().Contains(keyword) ||
                       a.ArticleContent.ToLower().Contains(keyword))
                       .ToList();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<Article>();
            }
        }


        public List<string> GetAllUsernames()
        {
            List<string> usernames = new List<string>();

            try
            {
                usernames = (from user in dailyBytesContext.Users
                             select user.Username).ToList();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                usernames = null;
            }
            return usernames;
        }

        public int AuthorArticleUSP(AuthorArticleDto dto)
        {
            int articleId = 0;

            try
            {
                SqlParameter prmHeadline = new SqlParameter("@Headline", dto.Headline);
                SqlParameter prmSubHeading = new SqlParameter("@SubHeading", dto.SubHeading);
                SqlParameter prmArticleContent = new SqlParameter("@ArticleContent", dto.ArticleContent);
                SqlParameter prmCategoryId = new SqlParameter("@CategoryId", dto.CategoryId);
                SqlParameter prmEditorId = new SqlParameter("@EditorId", dto.EditorId);
                SqlParameter prmMediaId = new SqlParameter("@MediaId", dto.MediaId);
                SqlParameter prmAuthorId = new SqlParameter("@AuthorId", dto.AuthorId);


                SqlParameter prmArticleId = new SqlParameter("@ArticleId", System.Data.SqlDbType.Int);
                prmArticleId.Direction = System.Data.ParameterDirection.Output;

                dailyBytesContext.Database.ExecuteSqlRaw("EXEC usp_AuthorArticles @Headline,@SubHeading,@ArticleContent,@CategoryId,@EditorId,@AuthorId,@MediaId,@ArticleId OUTPUT",
                     prmHeadline, prmSubHeading, prmArticleContent, prmCategoryId, prmEditorId, prmAuthorId, prmMediaId, prmArticleId);

                articleId = Convert.ToInt32(prmArticleId.Value);
                Console.WriteLine("Return Result : " + articleId);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                articleId = 0;
            }
            return articleId;
        }

        public List<Article> GetAllArticlesForEditor(int editorId)
        {
            List<Article> articles = new List<Article>();

            try
            {
                articles = dailyBytesContext.Articles
                            .Where(a => a.EditorId == editorId && a.Status == "Under_Review")
                            .ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                articles = null;
            }

            return articles;
        }

        public bool AddFeedback(FeedbackDto feedback)
        {
            bool status = false;

            try
            {
                Article article = dailyBytesContext.Articles.Where(a => a.ArticleId == feedback.ArticleId).FirstOrDefault();
                if (article != null)
                {
                    article.Feedback = feedback.Feedback;
                    article.Status = "Rejected";
                    dailyBytesContext.SaveChanges();
                    status = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                status = false;
            }

            return status;
        }


        public bool SendArticleForReviewUsingSP(int articleId, int authorId, int editorId)
        {
            int returnResult = 0;
            bool status = false;
            try
            {
                SqlParameter prmArticleId = new SqlParameter("@ArticleId", articleId);
                SqlParameter prmAuthorId = new SqlParameter("@AuthorId", authorId);
                SqlParameter prmEditorId = new SqlParameter("@EditorId", editorId);

                SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
                prmReturnResult.Direction = System.Data.ParameterDirection.Output;

                dailyBytesContext.Database.ExecuteSqlRaw("EXEC @ReturnResult = usp_SendArticleForReview @ArticleId,@AuthorId,@EditorId", prmReturnResult, prmArticleId, prmAuthorId, prmEditorId);
                returnResult = Convert.ToInt32(prmReturnResult.Value);

                if (returnResult == 1)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                returnResult = -99;
                status = false;
            }

            return status;
        }


        public bool PublishArticle(int articleId)
        {
            bool status = false;

            try
            {
                Article article = dailyBytesContext.Articles.Where(a => a.ArticleId == articleId).FirstOrDefault();
                if (article != null)
                {
                    article.Status = "Published";
                    dailyBytesContext.SaveChanges();
                    status = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                status = false;
            }

            return status;
        }

        public List<EditorDto> GetEditors()
        {
            try
            {
                return dailyBytesContext.Users.Where(u => u.RoleId == 3).Select(u => new EditorDto
                {
                    EditorId = u.UserId,
                    EditorName = u.Username
                }).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

        }
        public List<MediaDto> GetMedia()
        {
            try
            {
                return dailyBytesContext.Media.Select(m => new MediaDto
                {
                    MediaId = m.MediaId,
                    MediaName = m.MediaName
                }).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        //Add a method to call the archive article stored procedure
        public bool ArchiveArticleUsingSP(int articleId)
        {
            int returnResult = 0;
            bool status = false;
            try
            {
                SqlParameter prmArticleId = new SqlParameter("@ArticleId", articleId);
                SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
                prmReturnResult.Direction = System.Data.ParameterDirection.Output;
                dailyBytesContext.Database.ExecuteSqlRaw("EXEC @ReturnResult = usp_ArchiveArticle @ArticleId", prmReturnResult, prmArticleId);
                returnResult = Convert.ToInt32(prmReturnResult.Value);
                if (returnResult == 1)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                returnResult = -99;
                status = false;
            }
            return status;
        }

        public User GetUserById(int userId)
        {
            User user = null;
            try
            {
                user = dailyBytesContext.Users.Where(u => u.UserId == userId).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                user = null;
            }
            return user;
        }

        public bool UpdateUserProfileUsingSP(int userId, string firstName, string lastName, 
            string email, string gender, string contactNumber, DateTime dateOfBirth, string address)
        {
            bool status = false;
            int returnResult = 0;
            
            try
            {
                string dob = dateOfBirth.ToString("yyyy-MM-dd");

                SqlParameter prmUserId = new SqlParameter("@UserId", userId);
                SqlParameter prmFirstName = new SqlParameter("@FirstName", firstName);
                SqlParameter prmLastName = new SqlParameter("@LastName", lastName);
                SqlParameter prmEmail = new SqlParameter("@Email", email);
                SqlParameter prmGender = new SqlParameter("@Gender", gender);
                SqlParameter prmContactNumber = new SqlParameter("@ContactNumber", contactNumber);
                SqlParameter prmDateOfBirth = new SqlParameter("@DateOfBirth", dob);
                SqlParameter prmAddress = new SqlParameter("@Address", address);

                SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
                prmReturnResult.Direction = System.Data.ParameterDirection.Output;

                dailyBytesContext.Database.ExecuteSqlRaw(
                    "EXEC @ReturnResult = usp_UpdateUserProfile @UserId, @FirstName, @LastName, @Email, @Gender, @ContactNumber, @DateOfBirth, @Address",
                    prmReturnResult, prmUserId, prmFirstName, prmLastName, prmEmail, prmGender, prmContactNumber, prmDateOfBirth, prmAddress);

                returnResult = Convert.ToInt32(prmReturnResult.Value);
                Console.WriteLine("Update Profile Return Result: " + returnResult);

                if (returnResult == 1)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                status = false;
            }

            return status;
        }

        public List<JournalistArticleDto> GetJournalistArticles(int journalistId)
        {
            List<JournalistArticleDto> lstArticles = new List<JournalistArticleDto>();

            try
            {
                lstArticles = dailyBytesContext.JournalistArticlesDto
                    .FromSqlInterpolated($"SELECT * FROM ufn_GetJournalistArticles({journalistId})")
                    .ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                lstArticles = null;
            }
            return lstArticles;
        }

        public int SelectMembershipUSP(int userId, string membershipName)
        {
            int returnResult = 0;

            try
            {
                SqlParameter prmUserId = new SqlParameter("@UserId", userId);
                SqlParameter prmMembershipName = new SqlParameter("@MembershipName", membershipName);

                SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
                prmReturnResult.Direction = System.Data.ParameterDirection.Output;

                dailyBytesContext.Database.ExecuteSqlRaw(
                    "EXEC @ReturnResult = usp_SelectMembership @UserId, @MembershipName",
                    prmReturnResult, prmUserId, prmMembershipName);

                returnResult = Convert.ToInt32(prmReturnResult.Value);
                Console.WriteLine("Return Result: " + returnResult);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                returnResult = -99;
            }

            return returnResult;
        }
    }
}
