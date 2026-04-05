USE [master]
GO
IF (EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE ('[' + name + ']' = N'DailyBytesDB'OR name = N'DailyBytesDB')))
DROP DATABASE DailyBytesDB

CREATE DATABASE DailyBytesDB
GO

USE DailyBytesDB
GO

IF OBJECT_ID('Users') IS NOT NULL
	DROP TABLE Users
GO

IF OBJECT_ID('Articles') IS NOT NULL
	DROP TABLE Articles
GO

IF OBJECT_ID('ArticleCategories') IS NOT NULL
	DROP TABLE ArticleCategories
GO

IF OBJECT_ID('Roles') IS NOT NULL
	DROP TABLE Roles
GO

IF OBJECT_ID('Media') IS NOT NULL
	DROP TABLE Media
GO

IF OBJECT_ID('Membership') IS NOT NULL
	DROP TABLE Membership
GO

IF OBJECT_ID('ReviewArticles') IS NOT NULL
	DROP TABLE ReviewArticles
GO

IF OBJECT_ID('PublishArticles') IS NOT NULL
	DROP TABLE PublishArticles
GO

IF OBJECT_ID('Following') IS NOT NULL
	DROP TABLE Following
GO

CREATE TABLE Media (
   MediaId INT IDENTITY(1,1) CONSTRAINT pk_MediaId PRIMARY KEY,
   MediaName VARCHAR(30) NOT NULL
);


CREATE TABLE Roles (
   RoleId INT IDENTITY(1,1) CONSTRAINT pk_RoleId PRIMARY KEY,
   RoleName VARCHAR(30) NOT NULL UNIQUE
   CONSTRAINT CK_RoleName CHECK
   (RoleName IN ('User', 'Journalist', 'Editor', 'ChiefEditor'))
);

CREATE TABLE Users (
   UserId INT IDENTITY(1001,1) CONSTRAINT pk_UserID PRIMARY KEY,
   FirstName VARCHAR(50) NOT NULL,
   LastName VARCHAR(50) NOT NULL,
   Username VARCHAR(50) NOT NULL UNIQUE,
   Email VARCHAR(100) NOT NULL UNIQUE,
   Password VARCHAR(255) NOT NULL,
   Gender CHAR(1) NOT NULL,
   ContactNumber VARCHAR(10),
   DateOfBirth DATE,
   Address VARCHAR(255),
   ProfilePictureUrl VARCHAR(255),
   RoleId INT NOT NULL,
   Membership VARCHAR(20),
   CONSTRAINT fk_Users_Role FOREIGN KEY (RoleId) REFERENCES Roles(RoleId),
   CONSTRAINT CK_Users_Gender CHECK (Gender IN ('M','F', 'O'))
);

CREATE TABLE ArticleCategories
(
	[CategoryId] TINYINT IDENTITY(1,1) CONSTRAINT pk_CategoryId PRIMARY KEY,
	[CategoryName] VARCHAR(20) CONSTRAINT uq_CategoryName NOT NULL  UNIQUE
)
GO

CREATE TABLE Images
(
	[ImageId] TINYINT IDENTITY(1,1) CONSTRAINT pk_ImageId PRIMARY KEY,
	--[ArticleId] TINYINT CONSTRAINT fk_ArticleId REFERENCES Articles(ArticleId),
	[ImagePath] VARCHAR(500) NOT NULL,
	[ImageContentType] VARCHAR(50) NOT NULL,
	[ImageName] VARCHAR(255) NULL
)
GO

CREATE TABLE Articles
(
	[ArticleId] TINYINT CONSTRAINT pk_ArticleId PRIMARY KEY IDENTITY,
	[Headline] VARCHAR(40) NOT NULL,
	[SubHeading] VARCHAR(40) NOT NULL,
	[ArticleContent] VARCHAR(1000) NOT NULL,
	[Status] VARCHAR(20) NOT NULL, 
	[Feedback] VARCHAR(255),
	[Rating] DECIMAL(3,2),
	[CategoryId] TINYINT CONSTRAINT fk_CategoryId REFERENCES ArticleCategories(CategoryId),
	[MediaId] INT CONSTRAINT fk_MediaId REFERENCES Media(MediaId),
	[AuthorId] INT CONSTRAINT fk_AuthorId REFERENCES Users(UserId),
	[EditorId] INT CONSTRAINT fk_EditorId REFERENCES Users(UserId),
	[ChiefEditorId] INT CONSTRAINT fk_ChiefEditorId REFERENCES Users(UserId),
	[ImageId] TINYINT CONSTRAINT fk_ImageId REFERENCES Images(ImageId),
	CONSTRAINT CK_Article_Status CHECK (Status IN ('Under_Review','Pending','Published','Draft', 'Rejected','Archived'))
)
GO


CREATE TABLE Membership
(
	[MembershipId] TINYINT CONSTRAINT pk_MembershipId PRIMARY KEY IDENTITY,
	[MembershipName] VARCHAR(20) CONSTRAINT uq_MembershipName NOT NULL,
	[UserId] INT CONSTRAINT fk_Users_UserId FOREIGN KEY REFERENCES Users(UserId)
)
GO


CREATE TABLE ReviewArticles
(
	[ReviewId] TINYINT CONSTRAINT pk_ReviewId PRIMARY KEY IDENTITY,
	[ArticleId] TINYINT CONSTRAINT fk_Review_ArticleId FOREIGN KEY REFERENCES Articles(ArticleId),
	[ReviewerId] INT CONSTRAINT fk_Articles_AuthorId FOREIGN KEY REFERENCES Users(UserId),
	[ReviewStatus] VARCHAR(20)  NOT NULL
)
GO

CREATE TABLE PublishArticles
(
	[PublishId] TINYINT CONSTRAINT pk_PublishId PRIMARY KEY IDENTITY,
	[ArticleId] TINYINT CONSTRAINT fk_Publish_ArticleId FOREIGN KEY REFERENCES Articles(ArticleId),
	[IsPublished] VARCHAR(20)  NOT NULL
)
GO


/*** Roles  ***/
INSERT INTO Roles (RoleName) VALUES
('User'),
('Journalist'),
('Editor'),
('ChiefEditor');

/*** Media  ***/
INSERT INTO Media(MediaName) VALUES
('Image'),
('Video'),
('Audio'),
('Text');

/*** Users  ****/

INSERT INTO Users
(FirstName, LastName, Username, Email, Password, Gender, ContactNumber, DateOfBirth, Address, ProfilePictureUrl, RoleId)
VALUES
('Ravi', 'Ranjan', 'ravir', 'ravi@gmail.com', 'hash123', 'M', '9876543210', '2002-05-10', 'Punjab, India', NULL, 2),
('Anita', 'Sharma', 'anitash', 'anita@gmail.com', 'hash456', 'F', '9123456789', '1999-08-21', 'Delhi, India', NULL, 3),
('Karan', 'Mehta', 'karanm', 'karan@gmail.com', 'hash789', 'M', '9988776655', '1995-12-15', 'Mumbai, India', NULL, 4),
('Amit', 'Verma', 'amitv', 'amit@gmail.com', 'hash321', 'M', '9011223344', '2000-03-18', 'Bangalore, India', NULL, 1),
('Neha', 'Kapoor', 'nehak', 'neha@gmail.com', 'hash901', 'F', '9876500011', '2001-04-12', 'Chandigarh, India', NULL, 2),
('Rahul', 'Singh', 'rahuls', 'rahul@gmail.com', 'hash902', 'M', '9876500012', '1998-07-19', 'Lucknow, India', NULL, 2),
('Pooja', 'Malik', 'poojam', 'pooja@gmail.com', 'hash903', 'F', '9876500013', '1999-11-02', 'Rohtak, India', NULL, 1),
('Suresh', 'Iyer', 'sureshi', 'suresh@gmail.com', 'hash904', 'M', '9876500014', '1996-01-23', 'Chennai, India', NULL, 3),
('Meena', 'Joshi', 'meenaj', 'meena@gmail.com', 'hash905', 'F', '9876500015', '2000-09-14', 'Jaipur, India', NULL, 2),
('Arjun', 'Patel', 'arjunp', 'arjun@gmail.com', 'hash906', 'M', '9876500016', '1997-06-05', 'Ahmedabad, India', NULL, 1),
('Simran', 'Kaur', 'simrank', 'simran@gmail.com', 'hash907', 'F', '9876500017', '2002-12-30', 'Amritsar, India', NULL, 2),
('Vikas', 'Gupta', 'vikasg', 'vikas@gmail.com', 'hash908', 'M', '9876500018', '1995-03-17', 'Kanpur, India', NULL, 3),
('Nikhil', 'Bansal', 'nikhilb', 'nikhil@gmail.com', 'hash909', 'M', '9876500019', '1999-10-08', 'Noida, India', NULL, 1),
('Isha', 'Arora', 'ishaa', 'isha@gmail.com', 'hash910', 'F', '9876500020', '2001-02-26', 'Gurgaon, India', NULL, 2);


/*** AticlesCategories ***/

INSERT INTO ArticleCategories (CategoryName) VALUES
('Entertainment'),
('Sports'),
('Politics'),
('Education'),
('Business');


/*** Images ***/

INSERT INTO Images (ImagePath, ImageContentType, ImageName)
VALUES
('/images/tech1.jpg', 'image/jpeg', 'Tech Image'),
('/images/sports1.png', 'image/png', 'Sports Image'),
('/images/health1.jpg', 'image/jpeg', 'Health Image');

/*** ArticlesCategories ***/
INSERT INTO Articles
(Headline, SubHeading, ArticleContent, Status, Feedback, Rating, CategoryId,MediaId, AuthorId, EditorId, ChiefEditorId, ImageId)
VALUES
(
'AI in 2026',
'How AI is shaping the future',
'AI is transforming industries worldwide...',
'Under_Review',
NULL,
NULL,
1,     -- Technology
2,
1001,  -- Journalist (Ravi)
1002,  -- Editor (Anita)
1003,  -- Chief Editor (Karan)
1
),
(
'Fitness Trends',
'Health habits you should adopt',
'Staying fit requires consistency...',
'Published',
'Well written article',
4.50,
2,     -- Health
1,
1001,
1002,
1003,
3
),
(
'Cloud Computing Trends',
'What enterprises are adopting',
'Cloud platforms are evolving rapidly...',
'Pending',
NULL,
NULL,
1,
3,
1005, -- Neha
1002,
1003,
1
),
(
'Mental Health Awareness',
'Why it matters more than ever',
'Mental health should be a priority...',
'Under_Review',
NULL,
NULL,
2,
2,
1006, -- Rahul
1002,
1003,
3
),
(
'Olympics 2026 Preview',
'Countries to watch out for',
'The upcoming Olympics will feature...',
'Draft',
NULL,
NULL,
3,
1,
1009, -- Meena
1002,
1003,
2
),
(
'Election Analysis',
'Key factors influencing voters',
'This election season focuses on...',
'Rejected',
'Needs more data support',
2.75,
4,
2,
1011, -- Simran
1002,
1003,
1
),
(
'Startup Culture in India',
'Rise of young entrepreneurs',
'India is witnessing a startup boom...',
'Published',
'Excellent insights',
4.80,
1,
1,
1005,
1002,
1003,
2
),
(
'Yoga for Daily Life',
'Simple routines for beginners',
'Yoga improves both mental and physical health...',
'Published',
'Very informative',
4.20,
2,
2,
1014, -- Isha
1002,
1003,
3
);


/*** ReviewArticles ***/
INSERT INTO ReviewArticles (ArticleId, ReviewerId, ReviewStatus)
VALUES
(1, 1002, 'Pending'),
(1, 1002, 'Under_Review'),
(1, 1008, 'Under_Review'),
(1, 1002, 'Rejected'),
(1, 1012, 'Approved');
GO


SELECT * FROM Roles;
SELECT * FROM Users;
SELECT * FROM Articles;
SELECT * FROM ArticleCategories;
SELECT * FROM Media;
GO


/*****************************************************************/
/*			User Registration Stored Procedure					 */
/*****************************************************************/

/*** User Registration ***/

CREATE PROCEDURE usp_RegisterUser
(
   @FirstName        VARCHAR(50),
   @LastName         VARCHAR(50),
   @Username         VARCHAR(50),
   @Email            VARCHAR(100),
   @Password         VARCHAR(50),
   @ConfirmPassword  VARCHAR(50),
   @Gender           VARCHAR(10),   -- Male/Female/Other
   @ContactNumber    VARCHAR(10),
   @DateOfBirth      DATE,
   @Address          VARCHAR(255),
   @RoleId           INT,
   @MembershipType   VARCHAR(20)    -- Primary / Premium
)
AS
BEGIN
   SET NOCOUNT ON;

   BEGIN TRY

       IF (@FirstName NOT LIKE '%[A-Za-z]%' OR @FirstName LIKE '%[^A-Za-z]%')
           RETURN -1;
       IF (@LastName NOT LIKE '%[A-Za-z]%' OR @LastName LIKE '%[^A-Za-z]%')
           RETURN -2;
       IF (@Email NOT LIKE '%_@_%._%')
           RETURN -3;
       IF (LEN(@Password) < 8 OR LEN(@Password) > 16)
           RETURN -4;
       IF (@Password <> @ConfirmPassword)
           RETURN -5;
       IF (@Gender NOT IN ('Male','Female','Other'))
           RETURN -6;
       IF (@DateOfBirth IS NULL OR @DateOfBirth >= CAST(GETDATE() AS DATE))
           RETURN -7;
       IF (
           @ContactNumber LIKE '%[^0-9]%' OR
           LEN(@ContactNumber) <> 10 OR
           LEFT(@ContactNumber,1) = '0'
          )
           RETURN -8;
       IF (@MembershipType NOT IN ('Primary','Premium'))
           RETURN -9;
       IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
           RETURN -10;

       IF EXISTS (SELECT 1 FROM Users WHERE Username = @Username)
           RETURN -11;

       /* Insert User */
       INSERT INTO Users
       (
           FirstName, LastName, Username, Email, Password,
           Gender, ContactNumber, DateOfBirth, Address, RoleId
       )
       VALUES
       (
           @FirstName, @LastName, @Username, @Email,@Password,
           LEFT(@Gender,1),  -- M/F/O
           @ContactNumber, @DateOfBirth, @Address, @RoleId
       );

       DECLARE @NewUserId INT = SCOPE_IDENTITY();

       /* Insert Membership */
       INSERT INTO Membership (MembershipName, UserId)
       VALUES (@MembershipType, @NewUserId);

       RETURN 1;  

   END TRY
   BEGIN CATCH
       RETURN -99; 
   END CATCH
END;
GO


/** Test Stored Procedure **/

/*
DECLARE @Result INT;

EXEC @Result = usp_RegisterUser
   @FirstName = 'Ravi',
   @LastName = 'Ranjan',
   @Username = 'ravirj',
   @Email = 'ravirj@gmail.com',
   @Password = 'Test@1234',
   @ConfirmPassword = 'Test@1234',
   @Gender = 'Male',
   @ContactNumber = '9876543210',
   @DateOfBirth = '2002-05-10',
   @Address = 'Punjab, India',
   @RoleId = 1,
   @MembershipType = 'Premium';

SELECT @Result AS ResultCode;
GO
*/

/*** TVF to Fetch Articles ***/

CREATE FUNCTION dbo.ufn_GetAllPublishedArticles()
RETURNS TABLE
AS
RETURN
(
   SELECT
       A.ArticleId,
       A.Headline,
       A.SubHeading,
       A.ArticleContent,
       A.Status,
       
       A.Rating,

       AC.CategoryId,
       AC.CategoryName,

       U.UserId        AS AuthorId,
       U.FirstName     AS AuthorFirstName,
       U.LastName      AS AuthorLastName,
       U.Username      AS AuthorUsername,

       I.ImageId,
       I.ImagePath,
       I.ImageName,
       I.ImageContentType

   FROM Articles A
   INNER JOIN Users U
       ON A.AuthorId = U.UserId
   LEFT JOIN ArticleCategories AC
       ON A.CategoryId = AC.CategoryId
   LEFT JOIN Images I
       ON A.ImageId = I.ImageId
    WHERE A.Status='Published'
);
GO

SELECT * FROM dbo.ufn_GetAllPublishedArticles();
GO

--Stored Procedure for Author Articles
--DROP PROCEDURE usp_AuthorArticles;

CREATE PROCEDURE usp_AuthorArticles
(
   @Headline        VARCHAR(40),
   @SubHeading       VARCHAR(40),
   @ArticleContent        VARCHAR(1000),
   @CategoryId           TINYINT,
   @EditorId         INT,
   @AuthorId  INT,
   @MediaId           INT,   
   @ArticleId INT OUTPUT
)
AS
BEGIN
   SET NOCOUNT ON;

   BEGIN TRY

       /* Insert Article */
       INSERT INTO Articles
       (
          Headline,     
          SubHeading,       
          ArticleContent,        
          CategoryId,           
          EditorId,         
          AuthorId,  
          MediaId,            
          Status  
       )
       VALUES
       (
          @Headline,     
          @SubHeading,       
          @ArticleContent,        
          @CategoryId,           
          @EditorId,         
          @AuthorId,  
          @MediaId,            
          'Draft' 
       );
       SET @ArticleId = SCOPE_IDENTITY();

   END TRY
   BEGIN CATCH
       THROW; 
   END CATCH
END;
GO

/*
SELECT UserId,UserName FROM Users
WHERE RoleId=2;

SELECT UserId, UserName FROM Users
WHERE RoleId=3;
*/



-- Test usp_AuthorArticle 
/*
EXEC usp_AuthorArticles
          @Headline='Test Article Headline',     
          @SubHeading='Test Article Sub Heading',       
          @ArticleContent='Content abc xyz 1234',        
          @CategoryId='2',           
          @EditorId='1002',         
          @AuthorId='1001',  
          @MediaId='2',            
          @Status='Draft'  
*/

--SELECT * FROM Articles
--go

--select * from ArticleCategories
--go

--Scaffold-DbContext -Connection "Data Source =(localdb)\MSSQLLocalDB;Initial Catalog=DailyBytesDB;Integrated Security=true" -Provider Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -force

--DROP PROCEDURE IF EXISTS usp_SendArticleForReview;

CREATE PROCEDURE usp_SendArticleForReview
(
    @ArticleId INT,
    @AuthorId INT,
    @EditorId INT
)
AS 
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

    /*Check Article Exists*/

    IF NOT EXISTS(
        SELECT 1
        FROM Articles
        WHERE ArticleId = @ArticleId
        )
        RETURN -1;
    /*Check If Article belongs to this journalist*/
    IF NOT EXISTS(
        SELECT 1
        FROM Articles
        WHERE ArticleId = @ArticleId
        AND AuthorId = @AuthorId
        )
        RETURN -2;

         /*Check If Article is in Draft State*/
    IF NOT EXISTS(
        SELECT 1
        FROM Articles
        WHERE ArticleId = @ArticleId
        AND Status= 'Draft'
        )
        RETURN -3;
    
     /*Validate editor*/
    IF NOT EXISTS(
        SELECT 1
        FROM Users U 
        JOIN Roles R ON U.RoleId = R.RoleId 
        WHERE U.UserId = @EditorId
        AND R.RoleName = 'Editor'
        )
        RETURN -4;

     /*Check If Article belongs to this editor*/
    IF NOT EXISTS(
        SELECT 1
        FROM Articles
        WHERE ArticleId = @ArticleId
        AND AuthorId = @AuthorId
        AND EditorId = @EditorId
        )
        RETURN -5;

     /*Update Article*/
    UPDATE Articles
    SET
        Status = 'Under_Review'
        WHERE ArticleId = @ArticleId;

    --Insert Review Record
    INSERT INTO ReviewArticles
    (
        ArticleId,
        ReviewerId,
        ReviewStatus
     )VALUES(@ArticleId,@EditorId,'Under_Review');
     RETURN 1; --Success

     END TRY
     BEGIN CATCH
        RETURN -99
     END CATCH
    END;
    GO

/*****************************************************************/
/*			Update User Profile Stored Procedure				 */
/*****************************************************************/

CREATE PROCEDURE usp_UpdateUserProfile
(
   @UserId           INT,
   @FirstName        VARCHAR(50),
   @LastName         VARCHAR(50),
   @Email            VARCHAR(100),
   @Gender           VARCHAR(10),
   @ContactNumber    VARCHAR(10),
   @DateOfBirth      DATE,
   @Address          VARCHAR(255)
)
AS
BEGIN
   SET NOCOUNT ON;

   BEGIN TRY

       -- Check if user exists
       IF NOT EXISTS (SELECT 1 FROM Users WHERE UserId = @UserId)
           RETURN -1;

       -- Validate first name
       IF (@FirstName NOT LIKE '%[A-Za-z]%' OR @FirstName LIKE '%[^A-Za-z]%')
           RETURN -2;

       -- Validate last name
       IF (@LastName NOT LIKE '%[A-Za-z]%' OR @LastName LIKE '%[^A-Za-z]%')
           RETURN -3;

       -- Validate email format
       IF (@Email NOT LIKE '%_@_%._%')
           RETURN -4;

       -- Validate gender
       IF (@Gender NOT IN ('Male','Female','Other'))
           RETURN -5;

       -- Validate date of birth
       IF (@DateOfBirth IS NULL OR @DateOfBirth >= CAST(GETDATE() AS DATE))
           RETURN -6;

       -- Validate contact number
       IF (
           @ContactNumber LIKE '%[^0-9]%' OR
           LEN(@ContactNumber) <> 10 OR
           LEFT(@ContactNumber,1) = '0'
          )
           RETURN -7;

       -- Check if email is already used by another user
       IF EXISTS (
           SELECT 1 FROM Users 
           WHERE Email = @Email 
           AND UserId <> @UserId
       )
           RETURN -8;

       /* Update User Profile */
       UPDATE Users
       SET
           FirstName = @FirstName,
           LastName = @LastName,
           Email = @Email,
           Gender = LEFT(@Gender,1),
           ContactNumber = @ContactNumber,
           DateOfBirth = @DateOfBirth,
           Address = @Address
       WHERE UserId = @UserId;

       RETURN 1;  -- Success

   END TRY
   BEGIN CATCH
       RETURN -99; -- Error
   END CATCH
END;
GO


--Create a Stored Procedure for archiving articles by chief editor 
CREATE PROCEDURE usp_ArchiveArticle
(
    @ArticleId INT
)
AS 
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Check if Article Exists
        IF NOT EXISTS (
            SELECT 1
            FROM Articles
            WHERE ArticleId = @ArticleId
        )
            RETURN -1;

        -- Check if Article is in a valid state for archiving (Published/Rejected)
        IF NOT EXISTS (
            SELECT 1
            FROM Articles
            WHERE ArticleId = @ArticleId
              AND Status IN ('Published', 'Rejected')
        )
            RETURN -2;

        -- Update Article Status to Archived
        UPDATE Articles
        SET Status = 'Archived'
        WHERE ArticleId = @ArticleId;

        RETURN 1; -- Success

    END TRY
    BEGIN CATCH
        RETURN -99; -- Error
    END CATCH
END;
GO



    /*** TVF to Get Journalist Articles with Status ***/

CREATE FUNCTION dbo.ufn_GetJournalistArticles
(
    @JournalistId INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT
        A.ArticleId,
        A.Headline,
        A.SubHeading,
        A.ArticleContent,
        A.Status,
        A.Feedback,
        A.Rating,
        
        AC.CategoryId,
        AC.CategoryName,
        
        M.MediaId,
        M.MediaName,
        
        U.UserId AS AuthorId,
        U.FirstName AS AuthorFirstName,
        U.LastName AS AuthorLastName,
        U.Username AS AuthorUsername,
        
        E.UserId AS EditorId,
        E.FirstName AS EditorFirstName,
        E.LastName AS EditorLastName,
        
        CE.UserId AS ChiefEditorId,
        CE.FirstName AS ChiefEditorFirstName,
        CE.LastName AS ChiefEditorLastName,
        
        I.ImageId,
        I.ImagePath,
        I.ImageName,
        I.ImageContentType
        
    FROM Articles A
    INNER JOIN Users U
        ON A.AuthorId = U.UserId
    LEFT JOIN ArticleCategories AC
        ON A.CategoryId = AC.CategoryId
    LEFT JOIN Media M
        ON A.MediaId = M.MediaId
    LEFT JOIN Users E
        ON A.EditorId = E.UserId
    LEFT JOIN Users CE
        ON A.ChiefEditorId = CE.UserId
    LEFT JOIN Images I
        ON A.ImageId = I.ImageId
    WHERE 
        A.AuthorId = @JournalistId
        AND U.RoleId = 2  -- Ensures the user is a Journalist
);
GO

-- Get all articles for a specific journalist (e.g., UserId 1001)
SELECT * FROM dbo.ufn_GetJournalistArticles(1001);

-- Get only Draft articles for a journalist
SELECT ArticleId, Headline, Status, Feedback
FROM dbo.ufn_GetJournalistArticles(1005)
WHERE Status = 'Draft';

-- Get articles grouped by status
SELECT Status, COUNT(*) AS ArticleCount
FROM dbo.ufn_GetJournalistArticles(1001)
GROUP BY Status;

-- Get published articles with ratings
SELECT ArticleId, Headline, Rating, Feedback
FROM dbo.ufn_GetJournalistArticles(1001)
WHERE Status = 'Published'
ORDER BY Rating DESC;
GO


-- Stored Procedure to Select/Update User Membership
CREATE PROCEDURE usp_SelectMembership
(
    @UserId INT,
    @MembershipName VARCHAR(20)
)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Validate user exists
        IF NOT EXISTS (SELECT 1 FROM Users WHERE UserId = @UserId)
        BEGIN
            ROLLBACK TRANSACTION;
            RETURN -1; -- User does not exist
        END
        
        -- Validate membership name
        IF @MembershipName NOT IN ('Primary', 'Premium')
        BEGIN
            ROLLBACK TRANSACTION;
            RETURN -2; -- Invalid membership name
        END
        
        -- Check if user already has a membership
        IF EXISTS (SELECT 1 FROM Membership WHERE UserId = @UserId)
        BEGIN
            -- Update existing membership
            UPDATE Membership
            SET MembershipName = @MembershipName
            WHERE UserId = @UserId;
            
            COMMIT TRANSACTION;
            RETURN 2; -- Membership updated
        END
        ELSE
        BEGIN
            -- Insert new membership
            INSERT INTO Membership (MembershipName, UserId)
            VALUES (@MembershipName, @UserId);
            
            COMMIT TRANSACTION;
            RETURN 1; -- Membership created
        END
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        RETURN -99; -- Error occurred
    END CATCH
END;
GO

-- Test: Select membership for user 1001
DECLARE @Result INT;
EXEC @Result = usp_SelectMembership @UserId = 1001, @MembershipName = 'Premium';
SELECT @Result AS ResultCode;
-- Expected: 1 (new membership created) or 2 (existing membership updated)

-- Test: Try to insert duplicate (will update instead)
EXEC @Result = usp_SelectMembership @UserId = 1001, @MembershipName = 'Primary';
SELECT @Result AS ResultCode;
-- Expected: 2 (membership updated from Premium to Primary)

-- Verify
SELECT * FROM Membership WHERE UserId = 1001;
GO
