import "./post.css";
import {  useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BsFillHeartFill } from "react-icons/bs";
import {
 
  DeleteIcon,
} from "@chakra-ui/icons";
export default function Post({ data }) {
  const [postData, setpostData] = useState();
  const [showComments, setComments] = useState(false);
  const [createComment, setcreateComment] = useState("");
  const [topsection, settopsection] = useState();

  const toast = useToast();

  // time

  //like
  let ass = localStorage.getItem("id");
  let idata = {
    userId: ass,
  };

  const handleLikes = async () => {
    // console.log(data._id,data.userId)
    try {
      const res = await axios.put(
        `https://graceful-fox-apron.cyclic.app/post/${data._id}/like`,
        idata
      );
    
    
      toast({
        position: "top",
        title: `You Like ${data.username} post.`,
        // description: "done",
        status: "success",
        duration: 4000,
        isClosable: false,
      });

      setTimeout(() => {
        
        window.location.reload(false);
      }, 3000);
      
    } catch (error) {
      console.log(error);
    }
  };



  //comments

  const handleCommentPost = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/userslogin", {
      method: "POST",
      body: JSON.stringify(createComment),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err.message);
      });
    toast({
      position: "top",
      title: "You are Successfully Commented on post",
      // description: "done",
      status: "success",
      duration: 4000,
      isClosable: false,
    });
    // console.log(createComment);
  };

  //get post

  const getPost = async () => {
    try {
      const res = await axios("https://graceful-fox-apron.cyclic.app/post");
      setpostData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("topsection",topsection)
  useEffect(() => {
    getPost();
  }, []);

  //top  section

  const getTopData = async () => {
    try {
      const res = await axios(`https://graceful-fox-apron.cyclic.app/user/${data.userId}`);
      settopsection(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
    getTopData();
  }, []);

  // Delete post
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleDeletePost = async () => {
    let postId = data._id;

    console.log(postId, idata);

    try {
      const res = await axios.delete(`https://graceful-fox-apron.cyclic.app/post/${postId}`,{ data:idata} );
      alert(res.data.response.data)
    } catch (error) {
      console.log(error);
    }

    onClose()
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/* <Link to={`/profile/${user.username}`}> */}
            <img
              className="postProfileImg"
              src={data.user_profilePicture}
              alt=""
            />
            {/* </Link> */}
            <span className="postUsername">{data.username}</span>
            <span className="postDate">{data.postTime}</span>
          </div>
          <div className="postTopRight">
            {/* <h1
            onClick={handleDeletePost}
            >Delete</h1> */}
            <DeleteIcon onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody>
                  <p> <b>  Are you sure you want to delete your post. </b></p>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme='red'
                    onClick={handleDeletePost}
                  >Delete</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{data.desc}</span>
          <img className="postImg" src={data.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <p className="likeIcon" onClick={handleLikes}>
              <BsFillHeartFill />
            </p>
            {/* <p className="likeIcon">lik</p> */}
            <span className="postLikeCounter">{data.likes.length}</span>
          </div>
          <div className="postBottomRight">
            <span
              className="postCommentText"
              onClick={() => setComments((v) => !v)}
            >
              comments
            </span>
          </div>
        </div>
        <h1>{createComment}</h1>
        {showComments && (
          <Box as="section" className="comments-container">
        
            <div className="des">
              <input
                placeholder={"What's in your mind " + "?"}
                className="shareInput"
                type="text"
                onChange={(e) => setcreateComment(e.target.value)}
                required
              />

              <button className="shareButton" onClick={handleCommentPost}>
                Post
              </button>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
}
