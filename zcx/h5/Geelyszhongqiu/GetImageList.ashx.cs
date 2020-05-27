using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Manage.BLL;

namespace Manage.Web.CompanyProject.Geelyszhongqiu
{
    /// <summary>
    /// 获取点赞集合
    /// </summary>
    public class GetImageList : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string htmlid = context.Request["htmlid"].ToString();
            List<string> ImageList = RedisManage.Int.GetzjzhongqiudianzanList(htmlid);
            if (ImageList != null)
            {
                string imagestr = string.Join(",", ImageList.ToArray());
                context.Response.Write(imagestr);
                return;
            }
            context.Response.Write(" ");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}