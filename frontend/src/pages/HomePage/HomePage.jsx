// eslint-disable-next-line no-unused-vars
import React from "react";
import { Carousel } from "flowbite-react";
import img01 from "../../assets/01.jpg";
import img02 from "../../assets/02.jpg";
import img03 from "../../assets/03.jpg";
import Header from "../../components/Header/Header";

function HomePage() {
  return (
    <>
    <Header/>
      <div className="min-h-screen mt-20">
        <div
          className="h-56 sm:h-64 xl:h-80 2xl:h-96"
          style={{ height: "500px" }}
        >
          <Carousel slideInterval={5000}>
            <img src={img01} alt="..." />
            <img src={img02} alt="..." />
            <img src={img03} alt="..." />
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default HomePage;
