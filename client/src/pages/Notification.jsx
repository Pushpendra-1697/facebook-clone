import  axios  from "axios";
import React, { useState } from "react";


function Notification() {
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("")
  // console.log(description)    

  // const post = async (e) => {
  //   e.preventDefault();

  //   let formData = new FormData();
  //   formData.append("photo", image);
  //   formData.append("description", description);
  //   Axios.post("https://graceful-fox-apron.cyclic.app/upload", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   }).then((res) => {
  //     console.log("Success ", res.data);
  //   });

 
  // };

  const getSearchData = async () => {
    try {

      let res = await axios(`http://localhost:8088/user/search/${description}`)

      console.log(res.data)


    } catch (error) {
      console.log(error)
    }
  }
  getSearchData()





  

  return (
    <div>
       <div>
      {/* <input
        type="file"
        name="image"
        // value={formData.image}
        onChange={(e) => setimage(e.target.files[0]) }
      />
      <input type="text" onChange={(e) => setdescription(e.target.value)} />



      <button onClick={post}>image</button> */}
      <h1><b>Work in Progress...</b></h1>

      <input type="text" onChange={(e) => setdescription(e.target.value)} placeholder="users" />


    </div>
    </div>
  )
}

export default Notification
