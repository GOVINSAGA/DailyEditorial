using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DailyBytesDataAccessLayer;
using DailyBytesDataAccessLayer.Models;

namespace DailyBytesServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ArticlesController : Controller
    {
        DailyBytesRepository repository;
        public ArticlesController(DailyBytesRepository repository)
        {
            this.repository = repository;
        }
        [HttpGet]
        public JsonResult GetPublishedArticles()
        {
            List<AllPublishedArticleDto> articlesList = new List<AllPublishedArticleDto>();
            try
            {
                articlesList = repository.GetAllPublishedArticles();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                articlesList = null;
            }
            return Json(articlesList);
        }

        [HttpGet()]
        public JsonResult GetArticlesById(byte id)
        {
            try
            {
                var article = repository.ViewArticlesById(id);
                return Json(article);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return Json(null);
            }
        }

        [HttpGet]
        public JsonResult GetArticlesByEditorId(int editorId)
        {
            List<Article> articles = new List<Article>();

            try
            {
                articles = repository.GetAllArticlesForEditor(editorId);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                articles = null;
            }

            return Json(articles);
        }

        [HttpGet]
        public JsonResult GetJournalistArticles(int journalistId)
        {
            List<JournalistArticleDto> articlesList = new List<JournalistArticleDto>();

            try
            {
                articlesList = repository.GetJournalistArticles(journalistId);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                articlesList = null;
            }

            return Json(articlesList);
        }


        [HttpPost]
        public JsonResult AuthorArticle([FromBody] AuthorArticleDto article)
        {
            int articleId;
            try
            {
                articleId = repository.AuthorArticleUSP(article);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                articleId = 0;

            }
            return Json(articleId);
        }

        [HttpPut]
        public bool AddFeedback(FeedbackDto feedback)
        {
            bool status = false;

            try
            {
                status = repository.AddFeedback(feedback);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                status = false;
            }

            return status;
        }

        [HttpPost]
        public JsonResult SendArticleForReview(int articleId, int authorId, int editorId)
        {
            bool result;
            try
            {
                result = repository.SendArticleForReviewUsingSP(articleId, authorId, editorId);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                result = false;
            }
            return Json(result);
        }

        [HttpPut]
        public bool PublishArticle([FromBody] FeedbackDto feedback)
        {
            bool status = false;

            try
            {
                status = repository.PublishArticle(feedback.ArticleId);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                status = false;
            }

            return status;
        }

        [HttpGet]
        public JsonResult GetEditors()
        {
            List<EditorDto> editorsList = new List<EditorDto>();
            try
            {
                editorsList = repository.GetEditors();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                editorsList = null;
            }
            return Json(editorsList);
        }

        [HttpGet]
        public JsonResult GetMedia()
        {
            List<MediaDto> mediaList = new List<MediaDto>();
            try
            {
                mediaList = repository.GetMedia();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                mediaList = null;
            }
            return Json(mediaList);
        }

        //Add a method to archive an article
        [HttpPut]
        public JsonResult ArchiveArticle(int articleId)
        {
            bool status = false;
            try
            {
                status = repository.ArchiveArticleUsingSP(articleId);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                status = false;
            }
            return Json(status);

        }
    }
}
