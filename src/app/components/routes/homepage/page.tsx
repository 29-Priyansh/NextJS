// import Image from "next/image";
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";



export default function Homepage() {

  const router = useRouter();  
  const clickEvent = (route:string) => {
    router.push(`${route}`);
  }
  return (
    <>
      <div>this is home</div>
      <button onClick={()=> clickEvent("/components/routes/about")}>This is a button About</button><br/>
      <button onClick={()=> clickEvent("/components/routes/contact")}>This is a button Contact</button><br/>
      <Link href="/components/routes/about" >This is a link About</Link><br/>
      <Link href="/components/routes/contact">This is a link Contact</Link><br/>
    </>
  );
}
