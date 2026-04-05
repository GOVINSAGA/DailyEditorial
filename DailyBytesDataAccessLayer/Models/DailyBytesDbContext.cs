using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using System.Linq;

namespace DailyBytesDataAccessLayer.Models;

public partial class DailyBytesDbContext : DbContext
{
    public DailyBytesDbContext()
    {
    }

    public DailyBytesDbContext(DbContextOptions<DailyBytesDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Article> Articles { get; set; }

    public virtual DbSet<ArticleCategory> ArticleCategories { get; set; }

    public virtual DbSet<Image> Images { get; set; }

    public virtual DbSet<Medium> Media { get; set; }

    public virtual DbSet<Membership> Memberships { get; set; }

    public virtual DbSet<PublishArticle> PublishArticles { get; set; }

    public virtual DbSet<ReviewArticle> ReviewArticles { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }
    public DbSet<AllPublishedArticleDto> AllPublishedArticlesDto { get; set; }
    public DbSet<JournalistArticleDto> JournalistArticlesDto { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.

        => optionsBuilder.UseSqlServer(
        new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build()
            .GetConnectionString("DailyBytesDBConnectionString"));


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Article>(entity =>
        {
            entity.HasKey(e => e.ArticleId).HasName("pk_ArticleId");

            entity.Property(e => e.ArticleId).ValueGeneratedOnAdd();
            entity.Property(e => e.ArticleContent)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.Feedback)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Headline)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.Rating).HasColumnType("decimal(3, 2)");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.SubHeading)
                .HasMaxLength(40)
                .IsUnicode(false);

            entity.HasOne(d => d.Author).WithMany(p => p.ArticleAuthors)
                .HasForeignKey(d => d.AuthorId)
                .HasConstraintName("fk_AuthorId");

            entity.HasOne(d => d.Category).WithMany(p => p.Articles)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("fk_CategoryId");

            entity.HasOne(d => d.ChiefEditor).WithMany(p => p.ArticleChiefEditors)
                .HasForeignKey(d => d.ChiefEditorId)
                .HasConstraintName("fk_ChiefEditorId");

            entity.HasOne(d => d.Editor).WithMany(p => p.ArticleEditors)
                .HasForeignKey(d => d.EditorId)
                .HasConstraintName("fk_EditorId");

            entity.HasOne(d => d.Image).WithMany(p => p.Articles)
                .HasForeignKey(d => d.ImageId)
                .HasConstraintName("fk_ImageId");

            entity.HasOne(d => d.Media).WithMany(p => p.Articles)
                .HasForeignKey(d => d.MediaId)
                .HasConstraintName("fk_MediaId");
        });

        modelBuilder.Entity<ArticleCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("pk_CategoryId");

            entity.HasIndex(e => e.CategoryName, "UQ__ArticleC__8517B2E0C0933AE2").IsUnique();

            entity.Property(e => e.CategoryId).ValueGeneratedOnAdd();
            entity.Property(e => e.CategoryName)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Image>(entity =>
        {
            entity.HasKey(e => e.ImageId).HasName("pk_ImageId");

            entity.Property(e => e.ImageId).ValueGeneratedOnAdd();
            entity.Property(e => e.ImageContentType)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ImageName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ImagePath)
                .HasMaxLength(500)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Medium>(entity =>
        {
            entity.HasKey(e => e.MediaId).HasName("pk_MediaId");

            entity.Property(e => e.MediaName)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Membership>(entity =>
        {
            entity.HasKey(e => e.MembershipId).HasName("pk_MembershipId");

            entity.ToTable("Membership");

            entity.HasIndex(e => e.MembershipName, "UQ__Membersh__3B6B245D2A7ECC21").IsUnique();

            entity.Property(e => e.MembershipId).ValueGeneratedOnAdd();
            entity.Property(e => e.MembershipName)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.User).WithMany(p => p.Memberships)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fk_Users_UserId");
        });

        modelBuilder.Entity<PublishArticle>(entity =>
        {
            entity.HasKey(e => e.PublishId).HasName("pk_PublishId");

            entity.Property(e => e.PublishId).ValueGeneratedOnAdd();
            entity.Property(e => e.IsPublished)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Article).WithMany(p => p.PublishArticles)
                .HasForeignKey(d => d.ArticleId)
                .HasConstraintName("fk_Publish_ArticleId");
        });

        modelBuilder.Entity<ReviewArticle>(entity =>
        {
            entity.HasKey(e => e.ReviewId).HasName("pk_ReviewId");

            entity.Property(e => e.ReviewId).ValueGeneratedOnAdd();
            entity.Property(e => e.ReviewStatus)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Article).WithMany(p => p.ReviewArticles)
                .HasForeignKey(d => d.ArticleId)
                .HasConstraintName("fk_Review_ArticleId");

            entity.HasOne(d => d.Reviewer).WithMany(p => p.ReviewArticles)
                .HasForeignKey(d => d.ReviewerId)
                .HasConstraintName("fk_Articles_AuthorId");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("pk_RoleId");

            entity.HasIndex(e => e.RoleName, "UQ__Roles__8A2B6160B82A6261").IsUnique();

            entity.Property(e => e.RoleName)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("pk_UserID");

            entity.HasIndex(e => e.Username, "UQ__Users__536C85E4B4DB0B1A").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Users__A9D1053444EFFD12").IsUnique();

            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ContactNumber)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Gender)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Membership)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ProfilePictureUrl)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Users_Role");
        });

        modelBuilder.Entity<AllPublishedArticleDto>(entity =>
        {
            entity.HasNoKey();

            entity.ToFunction("ufn_GetAllPublishedArticles");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
