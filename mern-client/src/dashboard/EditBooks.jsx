import { useContext, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { Textarea, Label, Select, TextInput, Button } from "flowbite-react";
import { AuthContext } from "../context/AuthProvider";

const EditBooks = () => {
  const {user} = useContext(AuthContext)
  const { id } = useParams();
  const {
    bookTitle,
    authorName,
    imageURL,
    category,
    bookDescription,
    bookPDFURL,
    bookUploader,
    price,

  } = useLoaderData();
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Romance",
    "Historical Fiction",
    "Biography",
    "Autobiography",
    "Self-Help",
    "Health & Fitness",
    "Cooking",
    "Travel",
    "Science",
    "Technology",
    "Engineering",
    "Mathematics",
    "Art",
    "Music",
    "Photography",
    "Business",
    "Economics",
    "Law",
    "Politics",
    "History",
    "Religion",
    "Philosophy",
    "Psychology",
    "Education",
    "Parenting",
    "Sports",
    "Gardening",
    "Crafts & Hobbies",
    "Home & Garden",
    "Pets",
    "Children's Books",
    "Young Adult",
    "Comics & Graphic Novels",
    "Poetry",
    "Drama",
    "Anthologies",
    "Literary Criticism",
    "True Crime",
    "Humor",
    "Diaries & Journals",
    "Short Stories",
    "Essays",
    "Adventure",
    "Action",
    "Western",
    "Horror",
    "Spirituality",
    "New Age",
    "Reference",
    "Languages",
    "Media Studies",
    "Social Sciences",
    "Anthropology",
    "Sociology",
    "Cultural Studies",
    "Environmental Studies",
    "Geography",
    "Political Science",
    "Architecture",
    "Design",
    "Interior Design",
    "Urban Planning",
    "Agriculture",
    "Nature",
    "Astronomy",
    "Physics",
    "Chemistry",
    "Earth Sciences",
    "Life Sciences",
    "Medicine",
    "Nursing",
    "Pharmacology",
    "Veterinary Medicine",
    "Dentistry",
    "Optometry",
    "Physical Therapy",
    "Occupational Therapy",
    "Public Health",
    "Social Work",
    "Forensic Science",
    "Military Science",
    "Transportation",
    "Aviation",
    "Nautical",
    "Automotive",
    "Railroads",
    "Energy",
    "Manufacturing",
    "Industrial Technology",
    "Telecommunications",
    "Computer Science",
    "Information Technology",
    "Software Development",
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cybersecurity",
    "Network Administration",
    "Database Administration",
    "Operating Systems",
    "Hardware",
    "Digital Media",
    "E-Commerce",
    "Marketing",
    "Advertising",
    "Public Relations",
    "Sales",
    "Customer Service",
    "Human Resources",
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(
    bookCategories[0]
  );

  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedBookCategory(event.target.value);
  };

  // handle book submission
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;
    const price = form.price.value;
    const bookUploader = user.email;
    const bookObj = {
      bookTitle,
      authorName,
      imageURL,
      category,
      bookDescription,
      bookPDFURL,
      bookUploader,
      price
    };
    // update data
    fetch(`http://localhost:5000/book/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookObj),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("book updated succesfully!!");
        location.reload();
      });
  };
  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Update the book data</h2>
      <form
        onSubmit={handleUpdate}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        {/* First row */}
        <div className="flex gap-8">
          {/** Book Title */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput
              id="bookTitle"
              type="text"
              name="bookTitle"
              placeholder="Book name"
              required
              defaultValue={bookTitle}
            />
          </div>
          {/** Author Name */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput
              id="authorName"
              type="text"
              name="authorName"
              placeholder="Author Name"
              required
              defaultValue={authorName}
            />
          </div>
        </div>
        {/* 2nd  row */}
        <div className="flex gap-8">
          {/** imageURL Title */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Image URL" />
            </div>
            <TextInput
              id="imageURL"
              type="text"
              name="imageURL"
              placeholder="Book Image URL"
              required
              defaultValue={imageURL}
            />
          </div>
          {/** category */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Category" />
            </div>
            <Select
              id="inputState"
              name="categoryName"
              className="w-full rounded"
              value={selectedBookCategory}
              onChange={handleChangeSelectedValue}
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>
        {/*  book description */}
        <div className="lg:w-full">
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea
            className="w-full"
            id="bookDescription"
            placeholder="Write your book description..."
            required
            defaultValue={bookDescription}
            rows={4}
          />
        </div>

        {/* Book PDF LINK */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookPDFURL" value="Book PDF URL" />
          </div>
          <TextInput
            id="bookPDFURL"
            name="bookPDFURL"
            type="text"
            placeholder="Book PDF URL"
            required
            defaultValue={bookPDFURL}
          />
        </div>
        {/** Price */}
        <div className="lg:w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput
            id="price"
            type="number"
            name="price"
            placeholder="Price"
            required
            defaultValue={price ? price : 1}
          />
        </div>

        <Button type="submit" className="mt-5">
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditBooks;
