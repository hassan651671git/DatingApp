namespace DatingApp.Api.Helpers
{
    public class MessagesParams
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

       public string MessageContainer{get;set;}="unread";
        
    }
}