// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import toast from "react-hot-toast";
import { MdFavoriteBorder } from "react-icons/md";
import { Spinner } from "flowbite-react";
import Header from "../../components/Header/Header";

function RecipesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategoryDescription, setSelectedCategoryDescription] =
    useState("");
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/receipe/getAllRecipes"
        );
        console.log(response.data)
        setCategories(response.data.categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleFavoriteClick = async (category) => {
    const {
      idCategory,
      strCategory,
      strCategoryThumb,
      strCategoryDescription,
    } = category;
    try {
      await axios.post(
        "http://localhost:3001/receipe/addfavourite",
        {
          idCategory: idCategory,
          strCategory: strCategory,
          strCategoryThumb: strCategoryThumb,
          strCategoryDescription: strCategoryDescription,
        },
        { withCredentials: true }
      );
      toast.success("Successfully added to the favorite!");
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      toast.error("Error added to favourite!");
    }
  };

  const handleButtonClick = (description) => {
    setSelectedCategoryDescription(description);
    setOpenModal(true);
  };

  const handleFilterChange = (id) => {
    setActiveFilter(id);
  };

  const displayedCategories = activeFilter
    ? categories.filter((category) => category.idCategory === activeFilter)
    : categories;

  return (
    <div>
      <Header/>
      <div>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {categories.slice(0, 5).map((category) => (
            <Button
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"
              style={{ width: "200px" }}
              key={category.idCategory}
              onClick={() => handleFilterChange(category.idCategory)}
            >
              {category.strCategory}
            </Button>
          ))}
          <Button
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"
            style={{ width: "200px" }}
            onClick={() => setActiveFilter(null)}
          >
            Clear Filter
          </Button>
        </div>
        <br />
      </div>
      {loading ? (
        <Spinner aria-label="Default status example" />
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          style={{ padding: "30px" }}
        >
          {displayedCategories.map((category) => (
            <Card
              key={category.idCategory}
              imgSrc={category.strCategoryThumb}
              imgAlt={category.strCategory}
              style={{ padding: "20px" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-44">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {category.strCategory}
                </h1>
                <button onClick={() => handleFavoriteClick(category)}>
                  <MdFavoriteBorder
                    style={{ fontSize: "30px", color: "#fe5b85" }}
                  />
                </button>
              </div>
              <Button
                style={{ backgroundColor: "#fe5b85" }}
                onClick={() =>
                  handleButtonClick(category.strCategoryDescription)
                }
              >
                View Description
              </Button>
            </Card>
          ))}
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Category Description</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {selectedCategoryDescription}
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpenModal(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default RecipesPage;
