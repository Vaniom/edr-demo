import React, { CSSProperties } from 'react';
import BounceLoader from "react-spinners/BounceLoader";

const override : CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#0F265C",
};

class Loader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
    };
  }

  onLoadingChange = () => {
      if (this.props.loading != this.state.loading){
        this.setState({ loading: this.props.loading})
      }
    }

    componentDidUpdate() {
      this.onLoadingChange();
    }

  render() {
    const loadingProps = this.props.loading;
    return (
      <div className="sweet-loading">
        <BounceLoader
          cssOverride={override}
          size={40}
          color={"#123abc"}
          loading={this.state.loading}
          speedMultiplier={1.5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
}

export default Loader;