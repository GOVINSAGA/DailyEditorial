using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DailyBytesDataAccessLayer.Models;

public partial class User
{
    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public string? ContactNumber { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public string? Address { get; set; }

    public string? ProfilePictureUrl { get; set; }

    public int RoleId { get; set; }

    public string? Membership { get; set; }
    [JsonIgnore]
    public virtual ICollection<Article> ArticleAuthors { get; set; } = new List<Article>();

    [JsonIgnore]
    public virtual ICollection<Article> ArticleChiefEditors { get; set; } = new List<Article>();

    [JsonIgnore]
    public virtual ICollection<Article> ArticleEditors { get; set; } = new List<Article>();

    [JsonIgnore]
    public virtual ICollection<Membership> Memberships { get; set; } = new List<Membership>();

    [JsonIgnore]
    public virtual ICollection<ReviewArticle> ReviewArticles { get; set; } = new List<ReviewArticle>();

    [JsonIgnore]
    public virtual Role Role { get; set; } = null!;
}
