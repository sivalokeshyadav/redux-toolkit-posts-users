// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchingDeleteUsers, fetchingGetUsers, fetchingUpdateUsers } from "../apis/fetchingUserApis";
// import { useEffect } from "react";

// const Users = () => {
//   const loading = useSelector((state) => state.users.loading);
//   const error = useSelector((state) => state.users.error);
//   const posts = useSelector((state) => state.users.posts);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchingGetUsers());
//   }, [dispatch]);
//   const handleDeletePost=(productId)=>{
//     dispatch(fetchingDeleteUsers(productId));

//   }

//   const handleUpdatePost=(product)=>{
//     dispatch(fetchingUpdateUsers(product));
//     console.log(posts.length)
//   }
//   return (
//     <div>
//       <h1>Posts of api</h1>
//       {loading && <h2>Loading...</h2>}
//       {!loading && error && <h2>Error ...</h2>}
//       {!loading &&
//         posts.length > 0 &&
//         posts.map((post) => (
//           <div
//             key={post.id}
//             style={{ display: "flex", flexDirection: "column" }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   justifyContent: "flex-start",
//                 }}
//               >
//                 <h3>{post.id}.</h3>
//                 <h3>{post.title}</h3>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <button
//                   style={{ color: "greenyellow", backgroundColor: "black" }}
//                   onClick={handleUpdatePost(post)}
//                 >
//                   Update
//                 </button>
//                 <button style={{ color: "red", backgroundColor: "black" }} onClick={handleDeletePost(post.id)}>
//                   Delete
//                 </button>
//               </div>
//             </div>
//             <p
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "flex-start",
//               }}
//             >
//               {post.body}
//             </p>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Users;

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingDeleteUsers,
  fetchingGetUsers,
  fetchingUpdateUsers,
} from "../apis/fetchingUserApis";

const Users = () => {
  const [updatePost, setUpdatePost] = useState(null); // To store the post being updated
  const [isModalVisible, setIsModalVisible] = useState(false); // To control modal visibility
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const posts = useSelector((state) => state.users.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchingGetUsers());
  }, [dispatch]);

  const handleDeletePost = (postId) => {
    console.log("Deleting post with ID:", postId); 
    dispatch(fetchingDeleteUsers(postId));
  };

  const handleUpdatePost = (updatedPost) => {
    dispatch(fetchingUpdateUsers(updatedPost));
    setIsModalVisible(false); // Close the modal after updating
  };

  const openUpdateModal = (post) => {
    setUpdatePost(post); // Store the post to be updated
    setIsModalVisible(true); // Show the modal
  };

  const postList = useMemo(() => {
    return posts.map((post) => (
      <div key={post.id} style={{ marginBottom: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <h3>
            {post.id}. {post.title}
          </h3>

          <div>
            <button
              style={{
                marginRight: "1rem",
                color: "white",
                backgroundColor: "green",
              }}
              onClick={() => openUpdateModal(post)} // Open the update modal
            >
              Update
            </button>
            <button
              style={{ color: "white", backgroundColor: "red" }}
              onClick={() => handleDeletePost(post.id)}
            >
              Delete
            </button>
          </div>
        </div>
        <p>{post.body}</p>
      </div>
    ));
  }, [posts]);

  return (
    <div>
      <h1>Posts of API</h1>
      {loading && <h2>Loading...</h2>}
      {error && !loading && <h2>Error: {error}</h2>}
      {!loading && postList}

      {/* Modal for updating a post */}
      {isModalVisible && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "2rem",
            border: "1px solid #ccc",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Update Post</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const updatedPost = {
                ...updatePost,
                title: e.target.elements.title.value,
                body: e.target.elements.body.value,
              };
              handleUpdatePost(updatedPost); // Dispatch update action
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <label>
                Title:{" "}
                <input
                  type="text"
                  name="title"
                  defaultValue={updatePost?.title}
                  required
                />
              </label>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>
                Body:{" "}
                <textarea
                  name="body"
                  defaultValue={updatePost?.body}
                  required
                  rows="4"
                  style={{ width: "100%" }}
                />
              </label>
            </div>
            <div>
              <button
                type="button"
                style={{
                  marginRight: "1rem",
                  color: "white",
                  backgroundColor: "gray",
                }}
                onClick={() => setIsModalVisible(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  color: "white",
                  backgroundColor: "blue",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Users;
