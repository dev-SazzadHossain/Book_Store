import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditBookMutation,
  useSingleBookQuery,
} from "../../features/api/bookApiSlice";
import { toast } from "react-toastify";
import { FidgetSpinner } from "react-loader-spinner";

export const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(false);
  const { data, isLoading, isSuccess } = useSingleBookQuery(id);
  const [editBook, { isSuccess: editSuccess }] = useEditBookMutation();
  let content = null;
  if (isLoading) {
    content = (
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{
          margin: "auto",
        }}
        wrapperClass="fidget-spinner-wrapper"
      />
    );
  }
  const [addBook, setAddBook] = useState({
    name: data?.name,
    author: data?.author,
    thumbnail: data?.thumbnail,
    price: data?.price,
    rating: data?.rating,
    featured: data?.featured,
  });

  const handelForm = (e) => {
    setAddBook((prv) => {
      return { ...prv, [e.target.name]: e.target.value };
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    editBook({ id, data: addBook });
  };

  useEffect(() => {
    if (editSuccess) {
      toast.success("Edit Successfully Done");
      navigate("/");
    }
  }, [editSuccess]);
  useEffect(() => {
    setAddBook((prv) => {
      return { ...prv, featured: featured };
    });
  }, [featured]);

  useEffect(() => {
    setAddBook({
      name: data?.name,
      author: data?.author,
      thumbnail: data?.thumbnail,
      price: data?.price,
      rating: data?.rating,
      featured: data?.featured,
    });
    setFeatured(data?.featured);
  }, [data]);

  return (
    <>
      {isLoading ? (
        <div>{content}</div>
      ) : (
        <>
          {data?.id && (
            <main class="py-6 2xl:px-6">
              <div class="container">
                <div class="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
                  <h4 class="mb-8 text-xl font-bold text-center">Edit Book</h4>
                  <form onSubmit={handelSubmit} class="book-form">
                    <div class="space-y-2">
                      <label for="lws-bookName">Book Name</label>
                      <input
                        required
                        class="text-input"
                        type="text"
                        id="lws-bookName"
                        name="name"
                        value={addBook?.name}
                        onChange={handelForm}
                      />
                    </div>

                    <div class="space-y-2">
                      <label for="lws-author">Author</label>
                      <input
                        required
                        class="text-input"
                        type="text"
                        id="lws-author"
                        name="author"
                        onChange={handelForm}
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
                        checked={addBook?.featured}
                      />
                      <label for="lws-featured" class="ml-2 text-sm">
                        {" "}
                        This is a featured book{" "}
                      </label>
                    </div>

                    <button type="submit" class="submit" id="lws-submit">
                      Edit Book
                    </button>
                  </form>
                </div>
              </div>
            </main>
          )}
        </>
      )}
    </>
  );
};
