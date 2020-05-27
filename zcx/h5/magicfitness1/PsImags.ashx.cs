using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Common.com;
using System.Text.RegularExpressions;
using Manage.BLL;
using System.IO;
using System.Text;
using Manage.Model;

namespace Manage.Web.CompanyProject.magicfitness
{
    /// <summary>
    /// PsImags 的摘要说明
    /// </summary>
    public class PsImags : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            Stream s = context.Request.InputStream;
            byte[] result_byte = new byte[1024];
            MemoryStream ms = new MemoryStream();
            int count = s.Read(result_byte, 0, result_byte.Length);
            while (count != 0)
            {
                ms.Write(result_byte, 0, count);
                count = s.Read(result_byte, 0, result_byte.Length);
            }
            string base64str = System.Web.HttpUtility.UrlDecode(Encoding.UTF8.GetString(ms.ToArray()));

            string imagebase = context.Request["images"].ToString();
            int sex = context.Request["sex"].TryToInt();//性别
            int model = context.Request["model"].TryToInt();//模板
            string headurl =Path.Combine(AppDomain.CurrentDomain.BaseDirectory, context.Request["phone"].ToStr().TrimStart('/'));//头像
            string username = context.Request["username"].ToStr();//用户名
             

            string modelid = string.Empty;
            Json_PsParams psmodel = new Json_PsParams();
            if (sex == 0)
            {//男
                switch (model)
                {
                    case 1: psmodel = new Json_PsParams() { alpha_blend = 0.2, alpha_position = 0.5, mask_id = 8, model_id = "hezuo_miguhaoshencai_man1_20170825100901" }; break;
                    case 2: psmodel = new Json_PsParams() { alpha_blend = 0.2, alpha_position = 0.5, mask_id = 8, model_id = "hezuo_miguhaoshencai_man2_20170825101100" }; break;
                    case 3: psmodel = new Json_PsParams() { alpha_blend = 0.2, alpha_position = 0.7, mask_id = 8, model_id = "hezuo_miguhaoshencai_man3_20170825102121" }; break;
                    case 4: psmodel = new Json_PsParams() { alpha_blend = 0.2, alpha_position = 0.5, mask_id = 8, model_id = "hezuo_miguhaoshencai_man4_20170825101204" }; break;
                    case 5: psmodel = new Json_PsParams() { alpha_blend = 0.2, alpha_position = 0.5, mask_id = 8, model_id = "hezuo_miguhaoshencai_man4_20170825101204" }; break;//卡通
                }
            }
            else if (sex == 1)
            {
                switch (model)
                {
                    case 1: psmodel = new Json_PsParams() { alpha_blend = 0.2, alpha_position = 0.5, mask_id = 8, model_id = "hezuo_miguhaoshencai_woman1_20170825103057" }; break;
                    case 2: psmodel = new Json_PsParams() { alpha_blend = 0.2, alpha_position = 0.5, mask_id = 8, model_id = "hezuo_miguhaoshencai_woman2_20170825103143" }; break;
                    case 3: psmodel = new Json_PsParams() { alpha_blend = 0.2, alpha_position = 0.5, mask_id = 8, model_id = "hezuo_miguhaoshencai_woman3_20170825103328" }; break;
                    case 4: psmodel = new Json_PsParams() { alpha_blend = 0.2, alpha_position = 0.5, mask_id = 8, model_id = "hezuo_miguhaoshencai_woman4_20170825103354" }; break;
                    case 5: psmodel = new Json_PsParams() { alpha_blend = 0.2, alpha_position = 0.5, mask_id = 8, model_id = "hezuo_miguhaoshencai_man4_20170825101204" }; break;//卡通
                }
            }

            string PcImags = new PsImageToolsBLL().PsImageHc(imagebase, psmodel, headurl, username, model);
            context.Response.Write(PcImags);
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