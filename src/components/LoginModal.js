import React,{useState} from "react";
import { Modal, Input, Button} from "antd"; 
import { Link } from "react-router"; 
import LoginGoogle from "./LoginGoogle";

const LoginModal = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")

    const onLoginBtnClick = async (e) =>{
        e.preventDefault();
       loginCall({
          emailId:email,
          password:password
        }).then((res)=>{ 
        if(res){
          
          
        }
      }
        )
        .catch((err)=>
        console.warn(err.message))
    
        setIsModalOpen(false)
      }
    const handleAccount = () =>{
   setIsModalOpen(false)
    }
  return (
    <div className="flex  justify-center items-center">
       <Link to='/'>   <button
        // onClick={() => setIsOpen(true)}
        onClick={showModal}
        className="btnPrimary text-white px-4 py-2  cursor-pointer hover:bg-blue-600"
      >
      Log In
      </button>
      </Link>
     { <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="glass-modal "
      >
        <div className="p-6 flex flex-col items-center mt-14">
          <h2 className="text-2xl font-bold text-white mb-4">Log In</h2>

          <label className="flex min-w-full pb-1 ml-1">Email</label>
          <Input
            className=" p-3 rounded-lg bg-transparent margininput border border-white text-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="flex min-w-full pb-1 ml-1 ">Password</label>
          <Input.Password
            className="mb-3 p-3 rounded-lg bg-transparent border border-white text-white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex min-w-full forgotBox font-bold justify-end cursor-pointer">
            Forgot Password ?{" "}
          </div>

          <Button
            type="primary"
            className="w-full cursor-pointer signInbg  hover:bg-blue-700 mt-2"
            onClick={onLoginBtnClick}
          >
            Log In
          </Button>
          <Link to="/signup"><div className=" p-2 cursor-pointer" onClick={handleAccount} >
            Don't have an account?
          </div>
          </Link>
          <div>
            <LoginGoogle/>
          </div>
        </div>

      </Modal>}
    </div>
  );
};

export default LoginModal;
