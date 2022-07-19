import axios from "axios";

/**
 * En esta función se utilizó el la librería axios para el prellenado de las tareas.
 * @returns
 */
const Post = async () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts");
};

export default Post;
