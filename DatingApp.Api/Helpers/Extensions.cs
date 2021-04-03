using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.Api.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationsError(this HttpResponse response, string Message)
        {
            response.Headers.Add("Application-Error", Message);
            response.Headers.Add("access-control-expose-headers", "Application-Error");
            response.Headers.Add("Access-Controll-Allow-Origions", "*");


        }


        public static void AddPagination(this HttpResponse response, PaginationHeader headers)
        {
            var camalCaseFormater = new JsonSerializerSettings();
            camalCaseFormater.ContractResolver = new CamelCasePropertyNamesContractResolver();

            response.Headers.Add("Pagination", JsonConvert.SerializeObject(headers, camalCaseFormater));
    
                response.Headers.Add("access-control-expose-headers", "Pagination");
 
        }

        public static int Age(this DateTime date){
            return DateTime.Now.Year-date.Year;
        }


         
    }
}