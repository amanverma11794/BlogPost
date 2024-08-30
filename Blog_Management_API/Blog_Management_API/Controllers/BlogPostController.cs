using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Blog_Management_API.Controllers
{
    
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BlogPostController : ControllerBase
    {
       
        public readonly string RelativePath;
        public BlogPostController(IOptions<MyDBSetting> options) { 
            this.RelativePath = Path.Combine(Directory.GetCurrentDirectory(), options.Value.DbFolder, options.Value.DbFileName);
        }
        [EnableCors("_BlogPostUI")]
        [HttpGet]
        public IEnumerable<BlogPostModel> GetList()
        {
            List<BlogPostModel> posts = new List<BlogPostModel>();
            posts = readJsonFile();
            return posts;
        }

        [EnableCors("_BlogPostUI")]
        [HttpPost]
        public void PostCreateUpdate([FromBody] BlogPostModel newobj)
        {
            List<BlogPostModel> posts = new List<BlogPostModel>();
            posts = readJsonFile();
            if (newobj.Id != 0)
            {
                foreach (var item in posts.Where(x => x.Id == newobj.Id))
                {
                    item.Username = newobj.Username;
                    item.Text = newobj.Text;
                    item.DateCreated = DateTime.Now.ToString("dd-MMM-yyyy hh:ss tt");
                }    
            }
            else
            {
                newobj.Id = posts.Count()==0?1:posts.Max(m => m.Id)+1;
                newobj.DateCreated= DateTime.Now.ToString("dd-MMM-yyyy hh:ss tt");
                posts.Add(newobj);
            }
            var json = JsonSerializer.Serialize(posts);
            System.IO.File.WriteAllText(this.RelativePath, json); 
        }

        [EnableCors("_BlogPostUI")]
        [HttpPost]
        public void PostDelete([FromBody] int id)
        {
            
            List<BlogPostModel> posts = new List<BlogPostModel>();
            posts = readJsonFile();

            posts.RemoveAll(m=>m.Id==id);
            
            var json = JsonSerializer.Serialize(posts);
            System.IO.File.WriteAllText(this.RelativePath, json);
        }

        public List<BlogPostModel> readJsonFile()
        {
            List<BlogPostModel> posts = new List<BlogPostModel>();

            string jsonString = System.IO.File.ReadAllText(this.RelativePath);

            var obj = new List<BlogPostModel>();
            if (!string.IsNullOrEmpty(jsonString))
            {

                obj = JsonSerializer.Deserialize<List<BlogPostModel>>(jsonString);
            }

            if (obj == null)
            {
                posts = new List<BlogPostModel>();
            }
            else
            {
                posts = obj;
            }
            return posts;
        }
    }
}
