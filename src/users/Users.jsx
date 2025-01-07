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
  const [update, setUpdate] = useState(false);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const posts = useSelector((state) => state.users.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchingGetUsers());
  }, [dispatch]);

  const handleDeletePost = (postId) => {
    dispatch(fetchingDeleteUsers(postId));
  };

  const handleUpdatePost = (post) => {
    dispatch(fetchingUpdateUsers(post));
  };
  const onClickUpdate = () => {
    setUpdate(true);
  };
  // Use `useMemo` to optimize rendering of the post list
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
              onClick={onClickUpdate}
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
      {update && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const updatedPost = {
              ...e.target.elements[0].value,
              id: parseInt(e.target.elements[1].value),
            };
            handleUpdatePost(updatedPost);
            setUpdate(false);
          }}
        >
          <input type="text" name="title" placeholder="Enter new title" />
          <input type="number" name="id" placeholder="Enter new ID" />
          <button type="submit">Update Post</button>
        </form>
      )}
    </div>
  );
};

export default Users;
