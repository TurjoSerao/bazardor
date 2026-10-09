import Image from "next/image";
import Marquee from "./components/Marquee";

export default function Home() {
  return (
    <div>
      <Marquee />
      <div className="max-w-7xl mx-auto">home page</div>
    </div>
  );
}
