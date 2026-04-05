using System;
using System.Collections.Generic;

namespace DailyBytesDataAccessLayer.Models;

public partial class ReviewArticle
{
    public byte ReviewId { get; set; }

    public byte? ArticleId { get; set; }

    public int? ReviewerId { get; set; }

    public string ReviewStatus { get; set; } = null!;

    public virtual Article? Article { get; set; }

    public virtual User? Reviewer { get; set; }
}
