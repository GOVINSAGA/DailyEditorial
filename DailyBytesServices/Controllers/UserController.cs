using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DailyBytesDataAccessLayer;
using DailyBytesDataAccessLayer.Models;

namespace DailyBytesServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : Controller
    {
        DailyBytesRepository repository;

        public UserController(DailyBytesRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public JsonResult GetAllUsers()
        {
            List<User> usersLst = new List<User>();

            try
            {
                usersLst = repository.GetAllUsers();

            }catch (Exception ex)
            {
                Console.WriteLine("Error : " + ex.Message);
                usersLst = null;
            }
            return Json(usersLst);
        }

        [HttpPost]
        public bool RegisterUser([FromBody] RegisterUserDto user)
        {
            bool status = false;
            Console.WriteLine("Register user hit ==>");
            Console.WriteLine("UserFirstName : " + user.FirstName);
            Console.WriteLine("UserLastName : " + user.LastName);
            Console.WriteLine("UserUsername : " + user.Username);
            Console.WriteLine("UserEmail : " + user.Username);
            Console.WriteLine("UserDob : " + user.DateOfBirth);

            try
            {
                status = repository.RegisterUserUsingUSP(user.FirstName, user.LastName, user.Username, user.Email,
                    user.Password, user.Password, user.Gender, user.ContactNumber,user.Address, user.DateOfBirth,
                    user.Membership, user.RoleId);
            } catch (Exception ex)
            {
                Console.WriteLine("Error : " + ex.Message);
                status = false;
            }

            return status;
        }

        [HttpPost]
        public JsonResult ValidateUserCredentials([FromBody] LoginDto login)
        {
            LoginDto loginDto = new LoginDto();
            try
            {
                loginDto = this.repository.ValidateLogin(login.EmailId, login.Password);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in Web Api : " + ex.Message);
                loginDto = null;
            }
            return Json(loginDto);
        }

        [HttpGet]
        public JsonResult GetAllUsernames()
        {
            List<string> usernames = new List<string>();

            try
            {
                usernames = repository.GetAllUsernames();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                usernames = null;
            }
            return Json(usernames);
        }

        [HttpGet("{userId}")]
        public JsonResult GetUserById(int userId)
        {
            User user = null;

            try
            {
                user = repository.GetUserById(userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                user = null;
            }
            return Json(user);
        }

        [HttpPost]
        public bool UpdateUserProfile([FromBody] UpdateUserDto user)
        {
            bool status = false;
            Console.WriteLine("Update user profile hit ==");
            Console.WriteLine("UserId: " + user.UserId);
            Console.WriteLine("UserFirstName: " + user.FirstName);
            Console.WriteLine("UserLastName: " + user.LastName);

            try
            {
                status = repository.UpdateUserProfileUsingSP(
                    user.UserId, 
                    user.FirstName, 
                    user.LastName, 
                    user.Email,
                    user.Gender, 
                    user.ContactNumber, 
                    user.DateOfBirth, 
                    user.Address);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                status = false;
            }

            return status;
        }

        [HttpPost]
        public JsonResult SelectMembership([FromBody] MembershipSelectionDto membershipDto)
        {
            int result = 0;
            string message = string.Empty;

            try
            {
                result = repository.SelectMembershipUSP(membershipDto.UserId, membershipDto.MembershipName);

                message = result switch
                {
                    1 => "Membership successfully created",
                    2 => "Membership successfully updated",
                    -1 => "User does not exist",
                    -2 => "Invalid membership name. Must be 'Primary' or 'Premium'",
                    -99 => "Database error occurred",
                    _ => "Unknown error"
                };

                Console.WriteLine($"SelectMembership Result: {result} - {message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                result = -99;
                message = "An error occurred while processing the membership selection";
            }

            return Json(new { StatusCode = result, Message = message });
        }
    }
}
