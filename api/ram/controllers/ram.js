"use strict";

const fetch = require("node-fetch");

module.exports = {
  crudPage: async (ctx) => {
    try {
      const response = await fetch("http://localhost:1337/rams");
      const data = await response.json();
      console.log("crudramPage", data);
      return await ctx.render("crud_ram/index", { data });
    } catch (err) {
      console.log("Errors on getting books!");
      return await ctx.render("crud_ram/index", { data: "" });
    }
  },
  crud_addPage: async(ctx) => {
      
      return await ctx.render("crud_ram/add", {
        name: "",
        clock_rate: "",
        size: "",
        image_url: "",
        type: "",
      });
  },
  crud_add: async(ctx) => {
    const name = ctx.request.body.name;
    const clock_rate = ctx.request.body.clock_rate;
    const size = ctx.request.body.size;
    const image_url = ctx.request.body.image_url;
    const type = ctx.request.body.type;
    //console.log(name, clock_rate, size, image_url, type);

    const form_data = {
      name,
      clock_rate,
      size, 
      image_url, 
      type,
    };

    try {
      // await db.query("INSERT INTO books SET ?", form_data);
      const response = await fetch("http://localhost:1337/rams", {
        method: "post",
        body: JSON.stringify(form_data), 
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return await ctx.redirect("/crud_ram");
    } catch (err) {
      console.log(err);
      return await ctx.render("crud_ram/add", {
        name: form_data.name,
        clock_rate: form_data.clock_rate,
        size: form_data.size,
        image_url: form_data.image_url,
        type: form_data.type
      });
    }
  },
  crud_editPage: async(ctx) => {
    const id = ctx.params.id;
    try {
      // const [rows] = await db.query("SELECT * FROM books WHERE id = ?", [id]);
      const response = await fetch(`http://localhost:1337/rams/${id}`);
      const data = await response.json();
      return await ctx.render("crud_ram/edit", {
        id: data.id,
        name: data.name,
        clock_rate: data.clock_rate,
        size: data.size,
        image_url: data.image_url,
        type: data.type
      });
    } catch (err) {
      console.log(err);
    }
  },
  crud_update: async(ctx) => {
    const id = ctx.request.body.id;
    const name = ctx.request.body.name;
    const clock_rate = ctx.request.body.clock_rate;
    const size = ctx.request.body.size;
    const image_url = ctx.request.body.image_url;
    const type = ctx.request.body.type;
    console.log(name, clock_rate, size, image_url, type,id);
  
    const form_data = {
      name,
      clock_rate,
      size, 
      image_url, 
      type,
    };
    try {
      const response = await fetch(`http://localhost:1337/rams/${id}`, {
        method: "put",
        body: JSON.stringify(form_data), 
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return await ctx.redirect("/crud_ram");
    } catch (err) {
      console.log(err);
    }
  },
  crud_delete: async(ctx) => {
    let id = ctx.params.id;

  try {
    // await db.query("DELETE FROM books WHERE id = ?", [id]);
    const response = await fetch(`http://localhost:1337/rams/${id}`, {
      method: "delete",
    });
    const data = await response.json();
  } catch (err) {
    console.log(err);
  }
  return await ctx.redirect("/crud_ram");
  }
};
