import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Shared/Header/Navigation";
import Leftside from "../Shared/LeftSide/Leftside";
import RightSide from "../Shared/RightSide/RightSide";

const MainLayout = () => {
  return (
    <div>
      <div className="fixed top-0 z-50 w-full">
        <Navigation />
      </div>
      <div className=" mt-[8vh] md:flex justify-between">
        <div className="lg:w-[400px] hidden md:fixed left-0 ">
          leftalkdsfdsaf Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Quae excepturi et, minima accusantium impedit adipisci
          voluptatum dolorem iure porro molestias aliquid qui perferendis nihil
          dolor hic quam. Ut dolores perferendis eum rerum unde, pariatur quia
          repellendus eius officiis provident! Laudantium temporibus consectetur
          odio iusto ullam perferendis dolor quisquam, debitis, mollitia totam
          ducimus, saepe itaque earum similique modi dolorem beatae? Doloribus
          debitis aperiam ex maiores molestias. Aspernatur repellendus quisquam
          cumque aut dolor, possimus vel perspiciatis itaque dolores laboriosam
          alias facere aliquid minima, iure, fugit velit tenetur voluptas?
          Suscipit aperiam fuga porro eaque corporis saepe corrupti distinctio
          itaque, cum, vero sequi doloribus molestias quia. Animi velit,
          corporis voluptas sed nulla corrupti perferendis dolorum iusto ducimus
          mollitia alias ullam nobis hic earum commodi rem magnam. Vel at minus,
          sequi et neque facilis libero, possimus consectetur unde inventore id
          minima adipisci, consequatur ullam. Quam ducimus quo, velit nulla in a
          aperiam cumque aut ut reiciendis voluptas, sapiente officiis id
          expedita, eligendi temporibus laudantium maxime consequuntur quisquam.
          Et quibusdam ducimus vero soluta quae eligendi odio minus, blanditiis
          velit ut earum assumenda debitis perferendis similique nemo molestias
          ea accusantium quaerat? Saepe temporibus ipsum amet voluptatem
          voluptatum ex officiis tempora, nulla, dolore dolor sapiente nesciunt,
          magnam iure ab dicta consequuntur quae. Pariatur dolores aliquam odio
          unde a eum vel cumque illo eos veniam animi maiores soluta et sunt,
          cum aliquid possimus reprehenderit quibusdam, corporis qui, quasi
          quisquam consequuntur porro? Atque possimus excepturi necessitatibus
          ipsam iure inventore laborum accusantium in sit odit incidunt,
          molestiae ea amet veniam obcaecati architecto voluptates saepe
          ratione. Distinctio, natus aperiam quibusdam veritatis dolorem nostrum
          reiciendis at nam tempora ipsum, perspiciatis, ratione magni quos
          rerum magnam quasi labore sint ipsa enim aliquid debitis sapiente.
          Perferendis accusamus expedita architecto! Velit repudiandae placeat
          recusandae blanditiis tempore nulla consectetur deserunt, voluptates
          quaerat magni voluptate esse eveniet minima dolore ex. Maxime sunt
          perspiciatis exercitationem, fugiat error pariatur sed sapiente,
          reiciendis est ut assumenda totam quod eos sequi minus? Dolores
          laboriosam explicabo voluptatum autem accusantium maxime. Qui
          recusandae corporis optio tempora consequuntur in adipisci atque,
          ipsa, perferendis id nulla ea voluptatem, eius repellat? Sit maiores
          maxime a, beatae nesciunt asperiores quo, at nemo omnis tenetur
          laboriosam ipsum labore ex dolore. Atque nobis dolor suscipit omnis
          eaque inventore cum officia quos mollitia, quod nisi doloremque beatae
          reprehenderit distinctio in nihil voluptates! Laborum dolore, quo rem,
          magnam illo veritatis, quam vero assumenda suscipit quidem accusantium
          harum perferendis ipsa aperiam excepturi delectus?
          <Leftside />
        </div>
        <div className="lg:w-[700px] mx-auto">
          <Outlet />
        </div>
        <div className="lg:w-[400px] hidden md:fixed right-0 text-right">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
