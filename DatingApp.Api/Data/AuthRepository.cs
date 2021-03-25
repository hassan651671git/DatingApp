using System;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Api.DTOs;
using DatingApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Api.Data
{

    public class AuthRepository : IAuthRepository
    {
        public DataContext _dbContext { get; set; }
        public AuthRepository(DataContext dbContext)
        {
            _dbContext = dbContext;

        }
        public async Task<User> Login(string userName, string password)
        {
            User user = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName == userName);
            if (user == null)
            {
                return null;
            }
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {

            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {

                byte[] computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (passwordHash.Length != computedHash.Length)
                    {
                        return false;
                    }
                    if (!passwordHash[i].Equals(computedHash[i])){
                        return false;
                    }
                }

                return true;

            }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            ceratePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }
        private void ceratePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }



        public async Task<bool> UserExists(string userName)
        {
            User user = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName == userName);
            if (user == null)
            {
                return false;
            }
            return true;

        }
    }
}