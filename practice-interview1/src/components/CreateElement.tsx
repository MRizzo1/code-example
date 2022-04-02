import { Component, ChangeEvent } from "react";
import ElementService from "../services/element.service";
import IElementData from "../types/element.type";

type State = IElementData & {
  submitted: boolean;
};

export default class AddElement extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveElement = this.saveElement.bind(this);
    this.newElement = this.newElement.bind(this);
    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false,
    };
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value,
    });
  }

  saveElement() {
    const data: IElementData = {
      title: this.state.title,
      description: this.state.description,
    };

    ElementService.createElement(data, "")
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newElement() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false,
    });
  }

  render() {
    const { submitted, title, description } = this.state;
    return (
      <div className="add-element-box">
        <h3>Add a new element</h3>
        {submitted ? (
          <div>
            <h4>You created an element</h4>
            <div className="add-element-btn">
              <button onClick={this.saveElement}>Add again</button>
            </div>
          </div>
        ) : (
          <div className="form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            <div className="add-element-btn">
              <button onClick={this.saveElement}>Add</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
