using System;
using System.Collections.Generic;

namespace DailyBytesDataAccessLayer.Models;

public partial class Image
{
    public byte ImageId { get; set; }

    public string ImagePath { get; set; } = null!;

    public string ImageContentType { get; set; } = null!;

    public string? ImageName { get; set; }

    public virtual ICollection<Article> Articles { get; set; } = new List<Article>();
}
