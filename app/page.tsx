import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProductCard from "@/components/productCard";

interface product {
  id: number;
  title: string;
  author: string;
  synopsis: string;
  volumeNumber: string;
}

const Home: FC = async () => {
  
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          
        </div>
        <h1 className="text-3xl font-bold text-center">Welcome to Manga Zone</h1>

        <p className="text-2xl text-center">A website for manga readers to keep track of what they are currently reading.</p>
        <p className="text-2xl text-center">The author of this website is Carlos Maniego. I am mostly watch anime but Manga is a great entertainment medium. </p>
        <br></br>
        <h2 className="text-2xl font-bold text-center">Why Manga Zone?</h2>
        <p className="text-2xl text-center">A lot of avid manga readers tend to lose track of what volume they are currently reading if they keep up with numerous series. Additionally, readers would want a quick way to describe what a manga is about. This is where Manga Zone comes in, users are able to create entries for their favorite manga and have information written down! </p>
      </main>
    </div>
  );
};

export default Home;
