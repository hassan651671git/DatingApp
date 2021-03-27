using System;
using System.Collections.Generic;
using System.IO;
using DatingApp.Api.Models;
using Newtonsoft.Json;
namespace DatingApp.Api.Data
{
    public class Seed
    {
        private readonly DataContext _context;

        public Seed(DataContext context)
        {
            this._context = context;
        }

        public void SeedUsers(){

            String userData=File.ReadAllText("Data/UserSeedData.json");
            List<User> users= JsonConvert.DeserializeObject<List<User>>(userData);
            foreach(User user in users){
                byte[] passwordHash,passwordSalt;
                CreatePasswordHash("123",out passwordHash,out passwordSalt);
                user.PasswordHash=passwordHash;
                user.PasswordSalt=passwordSalt;
                user.UserName=user.UserName.ToLower();
                user.KnowAs=user.UserName.ToLower();
                _context.Users.Add(user);
            }
             _context.SaveChanges();

        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }


        
    }
}