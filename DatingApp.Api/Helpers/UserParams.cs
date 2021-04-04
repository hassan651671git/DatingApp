namespace DatingApp.Api.Helpers
{
    public class UserParams
    {
        private const int maxPageSize=50;
        public int PageNumber{get;set;}=1;
        private int pageSize=5;
        public int PageSize
        {
            get { return pageSize; }
            set { this.pageSize = value>maxPageSize?maxPageSize:value; }
        }
       
       public int UserId{get;set;}
       public string Gender{get;set;}

       public int MinAge{get;set;}=18;
       public int MaxAge { get; set; }=99;
       public string orderBy{get;set;}

       public bool Likers{get;set;}=false;
        public bool Likees{get;set;}=false;

    }
}