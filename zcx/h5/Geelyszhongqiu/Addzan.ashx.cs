using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Manage.BLL;

namespace Manage.Web.CompanyProject.Geelyszhongqiu
{
    /// <summary>
    /// Addzan 的摘要说明
    /// </summary>
    public class Addzan : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string htmlid = context.Request["htmlid"].ToString();
            string openid = context.Request["openid"].ToString();
            bool isadd = RedisManage.Int.gjzhongqiudianzan(htmlid, openid);
            context.Response.Write(isadd ? 1 : 0);
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