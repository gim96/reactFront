import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: [],
      loading: true,
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeBody = this.handleChangeBody.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTitle(event) {
    this.setState({ value: event.target.value });
  }

  handleChangeBody(event) {
    this.setState({ value: event.target.value });
  }

  async componentDidMount() {
    const response = await fetch(
      "http://ec2-100-26-223-255.compute-1.amazonaws.com:9000/mongo"
    );
    const data = await response.json();
    console.log(data);
    this.setState({ person: data, loading: false });
  }

  render() {
    if (this.state.loading === true) {
      return <div>Loading....</div>;
    } else {
      return (
        <div>
          <form
            action="http://ec2-100-26-223-255.compute-1.amazonaws.com:9000/saveData"
            method="GET"
          >
            <input
              type="text"
              onChange={this.handleChangeTitle}
              name="myTitle"
            />
            <br />
            <input type="text" onChange={this.handleChangeBody} name="myBody" />
            <br />
            <input type="submit" value="save" />
          </form>
          <p>{this.state.person[1].body}</p>
        </div>
      );
    }
  }
}

export default App;
