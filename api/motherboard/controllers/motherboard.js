'use strict';

const fetch = require("node-fetch");

module.exports = {
  crudPage: async (ctx) => {
    try {
      const response = await fetch("http://localhost:1337/motherboards");
      const data = await response.json();
      //console.log("crudPage", data);
      return await ctx.render("crud_motherboard/index", { data });
    } catch (err) {
      console.log("Errors on getting books!");
      return await ctx.render("crud_motherboard/index", { data: "" });
    }
  },
  crud_addPage: async(ctx) => {
      
      return await ctx.render("crud_motherboard/add", {
        name: "",
       cpu_type: "",
        size: "",
        image_url: "",
        socket: "",
        ram_type:"",
      });
  },
  crud_add: async(ctx) => {
    const name = ctx.request.body.name;
    const cpu_type = ctx.request.body.cpu_type;
    const size = ctx.request.body.size;
    const image_url = ctx.request.body.image_url;
    const socket = ctx.request.body.socket;
    const ram_type = ctx.request.body.ram_type;
    //console.log(name, cpu_type, size, image_url, type);

    const form_data = {
      name,
      cpu_type,
      size, 
      image_url, 
      socket,
      ram_type
    };

    try {
      // await db.query("INSERT INTO books SET ?", form_data);
      const response = await fetch("http://localhost:1337/motherboards", {
        method: "post",
        body: JSON.stringify(form_data), 
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return await ctx.redirect("/crud_motherboard");
    } catch (err) {
      console.log(err);
      return await ctx.render("crud_motherboard/add", {
        name: form_data.name,
        cpu_type: form_data.cpu_type,
        size: form_data.size,
        image_url: form_data.image_url,
        ram_type: form_data.ram_type,
        socket:form_data.socket,
      });
    }
  },
  crud_editPage: async(ctx) => {
    const id = ctx.params.id;
    try {
      // const [rows] = await db.query("SELECT * FROM books WHERE id = ?", [id]);
      const response = await fetch(`http://localhost:1337/motherboards/${id}`);
      const data = await response.json();
      return await ctx.render("crud_motherboard/edit", {
        id: data.id,
        name: data.name,
        cpu_type: data.cpu_type,
        size: data.size,
        image_url: data.image_url,
        ram_type: data.ram_type,
        socket: data.socket,
      });
    } catch (err) {
      console.log(err);
    }
  },
  crud_update: async(ctx) => {
    const id = ctx.request.body.id;
    const name = ctx.request.body.name;
    const cpu_type = ctx.request.body.cpu_type;
    const size = ctx.request.body.size;
    const image_url = ctx.request.body.image_url;
    const ram_type = ctx.request.body.ram_type;
     const socket = ctx.request.body.socket;
    //console.log(name, cpu_type, size, image_url, type,id);
  
    const form_data = {
        name,
        cpu_type,
        size, 
        image_url, 
        socket,
        ram_type
      };
    try {
      const response = await fetch(`http://localhost:1337/motherboards/${id}`, {
        method: "put",
        body: JSON.stringify(form_data), 
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return await ctx.redirect("/crud_motherboard");
    } catch (err) {
      console.log(err);
    }
  },
  crud_delete: async(ctx) => {
    let id = ctx.params.id;

  try {
    // await db.query("DELETE FROM books WHERE id = ?", [id]);
    const response = await fetch(`http://localhost:1337/motherboards/${id}`, {
      method: "delete",
    });
    const data = await response.json();
  } catch (err) {
    console.log(err);
  }
  return await ctx.redirect("/crud_motherboard");
  }
};
