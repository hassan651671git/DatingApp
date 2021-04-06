using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Api.Helpers
{
    public class PagedList<T>:List<T>
    { 
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }   
        public int TotalPages { get; set; }  
        public int  TotalCount { get; set; } 
       public PagedList(List<T> items,int count,int pageNumper,int pageSize)
       {
           TotalCount=count;
           CurrentPage=pageNumper;
           PageSize=pageSize;
           TotalPages=(int)Math.Ceiling(TotalCount/(double)PageSize);
           this.AddRange(items);
       }

       public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source,
       int pageNumper,int pageSize)
       {
           int count=await source.CountAsync();
            var items=await source.Skip((pageNumper-1)*pageSize).Take(pageSize).ToListAsync<T>();
            return   new PagedList<T>(items,count,pageNumper,pageSize);

       }
        
    }
}