'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 const fetch = require("node-fetch");

 module.exports = {
   crudPage: async (ctx) => {
     try {
       const response = await fetch("http://localhost:1337/cpus");
       const data = await response.json();
      // console.log("crud_CPU_Page", data);
       return await ctx.render("crud_cpu/index", { data });
     } catch (err) {
      // console.log("Errors on getting cpu!");
       return await ctx.render("crud_cpu/index", { data: "" });
     }
   },
   crud_addPage: async(ctx) => {
       
       return await ctx.render("crud_cpu/add", {
         name: "",
         core: "",
         socket_id: "",
         image_url: "",
         GHz: "",
       });
   },
   crud_add: async(ctx) => {
     const name = ctx.request.body.name;
     const core = ctx.request.body.core;
     const socket_id = ctx.request.body.socket_id;
     const image_url = ctx.request.body.image_url;
     const GHz = ctx.request.body.type;
     //console.log(name, core, socket_id, image_url,GHz);
 
     const form_data = {
       name,
       core,
       socket_id, 
       image_url, 
       GHz,
     };
 
     try {
       // await db.query("INSERT INTO books SET ?", form_data);
       const response = await fetch("http://localhost:1337/cpus", {
         method: "post",
         body: JSON.stringify(form_data), 
         headers: { "Content-Type": "application/json" },
       });
       const data = await response.json();
       return await ctx.redirect("/crud_cpu");
     } catch (err) {
       console.log(err);
       return await ctx.render("crud_cpu/add", {
         name: form_data.name,
         core: form_data.core,
         socket_id: form_data.socket_id,
         image_url: form_data.image_url,
         GHz: form_data.GHz
       });
     }
   },
   crud_editPage: async(ctx) => {
     const id = ctx.params.id;
     try {
       // const [rows] = await db.query("SELECT * FROM books WHERE id = ?", [id]);
       const response = await fetch(`http://localhost:1337/cpus/${id}`);
       const data = await response.json();
       return await ctx.render("crud_cpu/edit", {
         id: data.id,
         name: data.name,
         core: data.core,
         socket_id: data.socket_id,
         image_url: data.image_url,
        GHz: data.GHz
       });
     } catch (err) {
       console.log(err);
     }
   },
   crud_update: async(ctx) => {
     const id = ctx.request.body.id;
     const name = ctx.request.body.name;
     const core = ctx.request.body.core;
     const socket_id = ctx.request.body.socket_id;
     const image_url = ctx.request.body.image_url;
     constGHz = ctx.request.body.type;
     console.log(name, core, socket_id, image_url,GHz,id);
   
     const form_data = {
       name,
       core,
       socket_id, 
       image_url, 
      GHz,
     };
     try {
       const response = await fetch(`http://localhost:1337/cpus/${id}`, {
         method: "put",
         body: JSON.stringify(form_data), 
         headers: { "Content-Type": "application/json" },
       });
       const data = await response.json();
       return await ctx.redirect("/crud_cpu");
     } catch (err) {
       console.log(err);
     }
   },
   crud_delete: async(ctx) => {
     let id = ctx.params.id;
 
   try {
     // await db.query("DELETE FROM books WHERE id = ?", [id]);
     const response = await fetch(`http://localhost:1337/cpus/${id}`, {
       method: "delete",
     });
     const data = await response.json();
   } catch (err) {
     console.log(err);
   }
   return await ctx.redirect("/crud_cpu");
   }
 };
