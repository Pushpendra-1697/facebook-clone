
import React, { useState } from "react";

const initState = {
  description: "",
  post_image: "",
};
function Message() {
  const [image, setimage] = useState("");
  const [formData, setFormData] = useState(initState);


  // console.log(formData)



  const handleChange = (e) => {

    setimage(e.target.files[0]);
  };

  const Change = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  





  const post = async (e) => {
    e.preventDefault();

    fetch("https://graceful-fox-apron.cyclic.app/post", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err.message);
      });

 
  };

  // console.log(image)

  const submit = () => {
    
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dd9cmhunr");

    fetch("http://api.cloudinary.com/v1_1/dd9cmhunr/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        setFormData({ ...formData, post_image: data.url });
      })
      .catch((err) => {
        console.log(err);
      });
  };



 
  return (
    <div>
      {/* <input
        type="file"
        name="image"
        // value={formData.image}
        onChange={handleChange}
      /> */}

{/* 
      <input type="text"
        name="description"
        // onChange={(e) => setdescription(e.target.value)}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      /> */}

      <h1><b>Work in Progress...</b></h1>

    

      {/* <button onClick={submit}>image</button> */}
      {/* <button onClick={post}>Post</button> */}

      {/* <button onClick={handleLikes}>Like</button> */}



      
    </div>
  );
}

export default Message;
