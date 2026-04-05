using System;
using System.Collections.Generic;

namespace DailyBytesDataAccessLayer.Models;

public partial class Article
{
    public byte ArticleId { get; set; }

    public string Headline { get; set; } = null!;

    public string SubHeading { get; set; } = null!;

    public string ArticleContent { get; set; } = null!;

    public string? Status { get; set; }

    public string? Feedback { get; set; }

    public decimal? Rating { get; set; }

    public byte? CategoryId { get; set; }

    public int? MediaId { get; set; }

    public int? AuthorId { get; set; }

    public int? EditorId { get; set; }

    public int? ChiefEditorId { get; set; }

    public byte? ImageId { get; set; }

    public virtual User? Author { get; set; }

    public virtual ArticleCategory? Category { get; set; }

    public virtual User? ChiefEditor { get; set; }

    public virtual User? Editor { get; set; }

    public virtual Image? Image { get; set; }

    public virtual Medium Media { get; set; }

    public virtual ICollection<PublishArticle> PublishArticles { get; set; } = new List<PublishArticle>();

    public virtual ICollection<ReviewArticle> ReviewArticles { get; set; } = new List<ReviewArticle>();
}
