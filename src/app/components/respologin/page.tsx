import "./style.css";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <div className="wrapper">
        <div className="sub-wrapper">
          <div className="logger p-20 gap-3">
            <h1 className="heading center">Login</h1>
            <label htmlFor="">Username</label>
            <input type="text" name="" id="" />
            <label htmlFor="">Password</label>
            <input type="password" name="" id="" />
            <div className="flex justify-between space-x-3 items-center">
              <div>
                <input type="checkbox" name="" id="" />
                Remember me
              </div>

              <Button className="custbutton">Forgot Password</Button>
            </div>
            <div className="flex justify-center">
              <Button className="custbutton">Login</Button>
            </div>
          </div>
          <div className="register">
            {/* // <Image src="./dark_image.jpg" alt="login" width={500} height={500} /> */}
            Welcome
          </div>
        </div>
      </div>
    </>
  );
}
