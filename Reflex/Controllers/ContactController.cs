﻿using System;
using System.Web.Mvc;
using Reflex.Models;
using Umbraco.Web.Mvc;
using System.Net.Mail;
using System.Web.Configuration;
using log4net;
using System.Reflection;

namespace Reflex.Controllers
{
    public class ContactController : SurfaceController
    {
        
        [HttpGet]
        public ActionResult RenderForm()
        {
            return PartialView(GetViewPath("_ContactForm"), new ContactViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RenderForm(ContactViewModel model)
        {
            return PartialView(GetViewPath("_ContactForm"), model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SubmitForm(ContactViewModel model)
        {
            var success = false;
            if (ModelState.IsValid)
            {
                success = SendEmail(model);
            }

            return PartialView(GetViewPath(success ? "_Success" : "_Error"));
        }

        public bool SendEmail(ContactViewModel model)
        {
            var logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            try
            {
                var message = new MailMessage();
                var client = new SmtpClient();

                var toAddress = WebConfigurationManager.AppSettings["ContactEmailTo"];
                var fromAddress = WebConfigurationManager.AppSettings["ContactEmailFrom"];

                message.Subject = $"Enquiry from: {model.Name} - {model.Email}";
                message.Body = $"Enquiry from: {model.Name} - {model.Email} {Environment.NewLine + Environment.NewLine} Message: {model.Message}";
                message.To.Add(new MailAddress(toAddress, toAddress));
                message.From = new MailAddress(fromAddress, fromAddress);

                client.Send(message);
                return true;

            }
            catch (System.Exception ex)
            {
                logger.Error("Contact Form Error", ex);
                return false;
            }
        }

        private string GetViewPath(string name)
        {
            return $"/Views/Partials/Contact/{name}.cshtml";
        }
    }
}
