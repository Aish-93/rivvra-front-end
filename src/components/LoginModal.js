import React,{useState} from "react";
import { Modal, Input, Button} from "antd";  

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
  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        className="glass-modal"
      >
        <div className="p-6 flex flex-col items-center">
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
            Sign In
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
