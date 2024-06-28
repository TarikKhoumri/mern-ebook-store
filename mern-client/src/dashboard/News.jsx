import React from 'react'
import { Textarea, Label, TextInput, Button } from "flowbite-react";

const News = () => {

    const handleBookSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
    
        const title = form.title.value;
        const body = form.body.value
        const date = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const  datePuc = date.toLocaleDateString(undefined, options);
        const News = {
          title, body, datePuc
        }
        // send data to db
        fetch("http://localhost:5000/add-post", {
          method:"POST",
          headers:{
            "Content-type" : "application/json",
          },
          body:JSON.stringify(News)
        }).then(res => res.json()).then(data => {
          alert("Added successfully!!");
          form.reset();
        })
      }
  return (
    <div className="px-4 my-12">
    <h2 className="mb-8 text-3xl font-bold">Add News</h2>
    <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
      {/* First row */}
      <div className="flex gap-8">
        {/** Book Title */}
        <div className="lg:w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="title" value="Title" />
          </div>
          <TextInput
            id="title"
            type="text"
            name="title"
            placeholder="title"
            required
          />
        </div>
      </div>
      <div className="lg:w-full">
          <div className="mb-2 block">
            <Label htmlFor="body" value="Body" />
          </div>
          <Textarea
            className="w-full"
            id="body"
            name='body'
            placeholder="Write your book description..."
            required
            rows={4}
          />
        </div>
        <Button type="submit" className="mt-5">Submit</Button>
      </form>
      </div>
  );
}

export default News