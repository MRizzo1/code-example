import { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";

import ElementService from "../services/element.service";

import IElementData from "../types/element.type";
import { Elements } from "./Elements";

import "../assets/css/home.css";

const Home = () => {
  const [elements, setElements] = useState<Array<IElementData>>([]);
  const [currentElement, setCurrentElement] = useState<IElementData | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveElements();
  }, []);

  function onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    setSearchTitle(e.target.value);
  }

  function retrieveElements() {
    ElementService.getAllElementAxios()
      .then((response: any) => {
        setElements(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  function refreshList() {
    retrieveElements();
    setCurrentElement(null);
    setCurrentIndex(-1);
  }

  function setActiveElement(element: IElementData, index: number) {
    setCurrentElement(element);
    setCurrentIndex(index);
  }
  function removeAllElements() {
    ElementService.deleteAllElementAxios()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  function searchSpecificTitle() {
    setCurrentElement(null);
    setCurrentIndex(-1);
    ElementService.findByTitleElementAxios(searchTitle)
      .then((response: any) => {
        setElements(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  return (
    <>
      <section className="banner-wrapper-area">
        <div className="container">
          <div className="banner-wrapper-content">
            <h1 className="banner-three-heading">Search an element </h1>
            <p>Find a particular element in the listing...</p>
            <div className="form">
              <div className="form-content">
                <div className="col-lg-4 col-md-12 p-0">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by title"
                      value={searchTitle}
                      onChange={onChangeSearchTitle}
                    />
                  </div>
                </div>

                <div className="col-lg-2 col-md-12 p-0">
                  <div className="submit-btn">
                    <button onClick={searchSpecificTitle}>Search Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="listings-area ptb-100 bg-f9f9f9">
        <div className="container">
          <div className="section-title">
            <h2>Elements List</h2>
            <span>Select an element to access its content</span>
            <button onClick={removeAllElements}>Remove All</button>
          </div>
          <div className="row">
            {elements.length > 0
              ? elements.map((element: IElementData, index: number) => (
                  <div
                    className="col-lg-6 col-md-12"
                    onClick={() => setActiveElement(element, index)}
                    key={index}
                  >
                    <div className="single-listings-item">
                      <div className="listings-content">
                        <span className="status">
                          {element.published ? "Published" : "Pending"}
                        </span>
                        <h3>
                          <a href="#">{element.title}</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))
              : Elements.map((element: IElementData, index: number) => (
                  <>
                    <div
                      className="col-lg-6 col-md-12"
                      onClick={() => setActiveElement(element, index)}
                      key={index}
                    >
                      <div className="single-listings-item">
                        <div className="listings-content">
                          <span className="status">
                            {element.published ? "Published" : "Pending"}
                          </span>
                          <h3>
                            <a href="#">{element.title}</a>
                          </h3>
                        </div>
                      </div>
                    </div>
                    {currentElement && currentElement.id === element.id && (
                      <div className="selected">
                        <h3>Element</h3>
                        <div className="selected-content">
                          <div className="selected-info">
                            <div>
                              <label>
                                <strong>Title:</strong>
                              </label>{" "}
                              {currentElement.title}
                            </div>
                            <div>
                              <label>
                                <strong>Description:</strong>
                              </label>{" "}
                              {currentElement.description}
                            </div>
                            <div>
                              <label>
                                <strong>Status:</strong>
                              </label>{" "}
                              {currentElement.published
                                ? "Published"
                                : "Pending"}
                            </div>
                          </div>
                          <div className="edit">
                            <Link
                              to={"/elements/" + currentElement.id}
                              className="link"
                            >
                              Edit
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
