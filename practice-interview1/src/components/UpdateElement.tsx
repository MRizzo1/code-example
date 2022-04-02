import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ElementService from "../services/element.service";
import IElementData from "../types/element.type";

export default function UpdateClass() {
  const [currentElement, setCurrentElement] = useState<IElementData>({
    id: null,
    title: "",
    description: "",
    published: false,
  });
  const [message, setMessage] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    params.id && getElement(params.id);
  }, []);

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setCurrentElement({ ...currentElement, title: title });
  }

  function onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;
    setCurrentElement({ ...currentElement, description: description });
  }

  function getElement(id: string) {
    ElementService.getElementAxios(id)
      .then((response: any) => {
        setCurrentElement(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  function updatePublished(status: boolean) {
    const data: IElementData = {
      id: currentElement.id,
      title: currentElement.title,
      description: currentElement.description,
      published: status,
    };
    ElementService.updateElementAxios(data, currentElement.id)
      .then((response: any) => {
        setCurrentElement({
          ...currentElement,
          published: status,
        });
        setMessage("The status was updated successfully!");
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  function updateElement() {
    ElementService.updateElementAxios(currentElement, currentElement.id)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  function deleteElement() {
    ElementService.deleteElementAxios(currentElement.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  return (
    <div className="update-element-box">
      <h3>Update element id: {params.id} </h3>
      {currentElement ? (
        <div className="edit-form">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentElement.title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentElement.description}
                onChange={onChangeDescription}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentElement.published ? "Published" : "Pending"}
            </div>
          </form>
          <div className="update-element-btn">
            {currentElement.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(true)}
              >
                Publish
              </button>
            )}
            <button className="badge badge-danger mr-2" onClick={deleteElement}>
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={updateElement}
            >
              Update
            </button>
            <p>{message}</p>
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Element...</p>
        </div>
      )}
    </div>
  );
}
