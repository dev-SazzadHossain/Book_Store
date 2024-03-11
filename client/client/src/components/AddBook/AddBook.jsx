import React, { useEffect, useState } from "react";
import { useStoreBookMutation } from "../../features/api/bookApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddBook = () => {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(false);
  const [storeBook, { data, isLoading, isSuccess }] = useStoreBookMutation();
  const [addBook, setAddBook] = useState({
    name: "",
    author: "",
    thumbnail: "",
    price: 0,
    rating: 0,
    featured: featured,
  });

  const handelForm = (e) => {
    setAddBook((prv) => {
      return { ...prv, [e.target.name]: e.target.value };
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    storeBook({ addBook });
    if (isSuccess) {
      toast.success("Added Book SuccessFully");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      toast.success("Added Book SuccessFully");
    }
  }, [isSuccess]);
  useEffect(() => {
    setAddBook((prv) => {
      return { ...prv, featured: featured };
    });
  }, [featured]);

  return (
    <main class="py-6 2xl:px-6">
      <div class="container">
        <div class="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          <h4 class="mb-8 text-xl font-bold text-center">Add New Book</h4>
          <form onSubmit={handelSubmit} class="book-form">
            <div class="space-y-2">
              <label for="lws-bookName">Book Name</label>
              <input
                onChange={handelForm}
                required
                class="text-input"
                type="text"
                id="lws-bookName"
                name="name"
                value={addBook?.name}
              />
            </div>

            <div class="space-y-2">
              <label for="lws-author">Author</label>
              <input
                required
                class="text-input"
                type="text"
                id="lws-author"
                onChange={handelForm}
                name="author"
                value={addBook?.author}
              />
            </div>

            <div class="space-y-2">
              <label for="lws-thumbnail">Image Url</label>
              <input
                required
                class="text-input"
                type="text"
                id="lws-thumbnail"
                name="thumbnail"
                onChange={handelForm}
                value={addBook?.thumbnail}
              />
            </div>

            <div class="grid grid-cols-2 gap-8 pb-4">
              <div class="space-y-2">
                <label for="lws-price">Price</label>
                <input
                  required
                  class="text-input"
                  type="number"
                  id="lws-price"
                  name="price"
                  onChange={handelForm}
                  value={addBook?.price}
                />
              </div>

              <div class="space-y-2">
                <label for="lws-rating">Rating</label>
                <input
                  required
                  class="text-input"
                  type="number"
                  id="lws-rating"
                  name="rating"
                  min="1"
                  max="5"
                  onChange={handelForm}
                  value={addBook?.rating}
                />
              </div>
            </div>

            <div class="flex items-center">
              <input
                onClick={() => setFeatured(!featured)}
                id="lws-featured"
                type="checkbox"
                name="featured"
                class="w-4 h-4"
              />
              <label for="lws-featured" class="ml-2 text-sm">
                {" "}
                This is a featured book{" "}
              </label>
            </div>

            <button type="submit" class="submit" id="lws-submit">
              Add Book
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
