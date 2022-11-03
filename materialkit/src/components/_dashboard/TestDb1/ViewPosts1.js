import React, { Component } from 'react';
import axios from 'axios';

export default class ViewPosts1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {}
    };
  }

  componentDidMount() {
    console.log(this.props);
    const id = this.props.match.params._id;

    axios.get(`/post/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          post: res.data.post
        });
        console.log(this.state.post);
      }
    });
  }

  render() {
    const { topic, description, postcategory } = this.state.post;

    return (
      <div style={{ marginTop: '20px' }}>
        <h4>{topic}</h4>
        <hr />
        <dl className="row">
          <dt className="col-sm-3">Description</dt>
          <dd className="col-sm-9">{description}</dd>

          <dt className="col-sm-3">Post Category</dt>
          <dd className="col-sm-9">{postcategory}</dd>
        </dl>
      </div>
    );
  }
}
