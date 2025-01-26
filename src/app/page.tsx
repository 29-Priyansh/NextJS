//routing example is in homepage
"use client";

import "./globals.css";

// import { Context } from "./components/context/page";
// import Login_page from "./components/respologin/page";
// import Grid_page from "./components/respogrid/page";
// import Weather  from "./components/weather/page";
import Todolist from "./components/todolist/page";
// import Homepage from "./components/routes/homepage/page";

export default function Home() {
  return (
    <>
      <Todolist />
      {/* <Context.Consumer>{(value)=>{return value.girl}}</Context.Consumer> */}
    </>
  );
}
