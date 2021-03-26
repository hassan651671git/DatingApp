using Microsoft.AspNetCore.Http;

namespace DatingApp.Api.Helpers
{
    public static class Extensions
    {
         public static void AddApplicationsError(this HttpResponse response,string Message){
             response.Headers.Add("Application-Error",Message);
              response.Headers.Add("Access-Controll-Expose-Headers","Application-Error");
               response.Headers.Add("Access-Controll-Allow-Origions","*");

         }
    }
}