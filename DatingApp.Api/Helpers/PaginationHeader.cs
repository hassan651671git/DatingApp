namespace DatingApp.Api.Helpers
{
    public class PaginationHeader
    {

        public int CurrentPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public int ItemsPerPage { get; set; }
 
 
        public PaginationHeader(int currentPage, int totalItems, int totalPages, int itemsPerPage)
        {
            this.CurrentPage = currentPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
            this.ItemsPerPage = itemsPerPage;

        }

        



    }
}