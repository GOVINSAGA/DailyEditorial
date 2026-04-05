using DailyBytesDataAccessLayer.Models;

namespace DailyBytesDataAccessLayer
{
    internal class Program
    {
        static DailyBytesDbContext context;
        static DailyBytesRepository repository;

        static Program()
        {
            context = new DailyBytesDbContext();
            repository = new DailyBytesRepository(context);
        }

        public static void GetRoles(DailyBytesRepository repo)
        {
            var roles = repository.GetRoles();
            Console.WriteLine("----------------------------------");
            Console.WriteLine("RoleId\tRoleName");
            Console.WriteLine("----------------------------------");
            foreach (var role in roles)
            {
                Console.WriteLine("{0}\t\t{1}", role.RoleId, role.RoleName);
            }
        }

        public static void GetAllUsers(DailyBytesRepository repo)
        {
            var users = repository.GetAllUsers();
            Console.WriteLine("----------------------------------");
            Console.WriteLine("UserId\tFirstName\tLastName\tUsername\tEmailId");
            Console.WriteLine("----------------------------------");
            foreach (var user in users)
            {
                Console.WriteLine("{0}\t\t{1}\t\t{2}\t\t{3}\t\t{4}", user.UserId, user.FirstName, user.LastName, user.Username, user.Email);
            }
        }

        public static void RegisterUser(DailyBytesRepository repo)
        {
            var dob = new DateTime(2003, 02, 03);
            bool status = repo.RegisterUserUsingUSP("Abhi", "Sri", "abhis", "abhi@email.com", "Test@123", "Test@123", "Male", "1234567890",
                "Delhi, India", dob, "Primary", 1);
            Console.WriteLine("Status : " + status);

            if(status)
            {
                Console.WriteLine("User created successfully!");
            }else
            {
                Console.WriteLine("Something went wrong, please try again!");
            }
        }

        public static void ValidateLogin(DailyBytesRepository repo)
        {
            var currentUser = repo.ValidateLogin("ravir","hash123");
            if (currentUser.RoleId > 0)
            {
                Console.WriteLine("Login Successful!");
                Console.WriteLine("RoleId: "+ currentUser.RoleId);
            }
            else
            {
                Console.WriteLine("Invalid Credentials");
            }
            
        }

        public static void TestLogout(DailyBytesRepository repo)
        {
            bool status = repo.Logout(1);
            if (status)
            {
                Console.WriteLine("Logout Successful!");            }
            else
            {
                Console.WriteLine("Logout failed");
            }

        }

        public static void TestAllPublishedArticles(DailyBytesRepository repo)
        {
            var articles=repository.GetAllPublishedArticles();
            var count = context.AllPublishedArticlesDto.Count();
            
            Console.WriteLine("----------------------------------");
            Console.WriteLine("TVF row Count = " + count);
            Console.WriteLine("----------------------------------");
            foreach (var article in articles)
            {
                Console.WriteLine("{0}", article.Headline);
            }
        }

        public static void ViewArticleById(DailyBytesRepository repo)
        {
            byte articleId = 1;

            var article = repo.ViewArticlesById(articleId);

            if (article != null)
            {
                Console.WriteLine("-------------------------------------------------------------------------------");
                Console.WriteLine("Article Details");
                Console.WriteLine("-------------------------------------------------------------------------------");
                Console.WriteLine($"Article Id    :{article.ArticleId}");
                Console.WriteLine($"Headline      :{article.Headline}");
                Console.WriteLine($"Sub Heading   :{article.SubHeading}");
                Console.WriteLine($"Content       :{article.ArticleContent}");
                Console.WriteLine($"Status        :{article.Status}");
                Console.WriteLine($"Rating        :{article.Rating}");
                Console.WriteLine($"Category Id   :{article.CategoryId}");
                Console.WriteLine($"Author Id     :{article.AuthorId}");
            }
            else
            {
                Console.WriteLine("Article not found  for the given ArticleId");
            }
        }

        public static void SearchArticlesByKeyword(DailyBytesRepository repo)
        {
            Console.WriteLine("Enter keyword to search articles :");
            string keyword = Console.ReadLine();

            var articles = repo.SearchArticlesByKeyword(keyword);

            if (articles.Count > 0)
            {
                Console.WriteLine("------------------------------------------------------");
                Console.WriteLine("Search Results");
                Console.WriteLine("------------------------------------------------------");


                foreach (var article in articles)
                {
                    Console.WriteLine($"Article Id :{article.ArticleId}");
                    Console.WriteLine($"Headline   :{article.Headline}");
                    Console.WriteLine($"Status     :{article.Status}");
                    Console.WriteLine("-----------------------------------------------------");
                }
            }
            else
            {
                Console.WriteLine("No articles found matching the keyword");
            }
        }
        
        public static void SendArticleForReview(DailyBytesRepository repo)
        {
            
            bool resultCode = repo.SendArticleForReviewUsingSP(5, 1009, 1002);
            Console.WriteLine("Return Code: " + resultCode);
        }

        public static void AuthorArticle(DailyBytesRepository repo)
        {
            var authorArticleDto = new AuthorArticleDto();
            authorArticleDto.Headline = "Infosys Training";
            authorArticleDto.SubHeading = "The best for freshers";
            authorArticleDto.ArticleContent = "----";
            authorArticleDto.CategoryId = 1;
            authorArticleDto.EditorId = 1008;
            authorArticleDto.MediaId = 1;
            authorArticleDto.AuthorId = 1005;

            int resultCode = repo.AuthorArticleUSP(authorArticleDto);
            Console.WriteLine("Return Code: " + resultCode);
        }
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!"); 
            AuthorArticle(repository);
        }
    }
}
