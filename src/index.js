import React, { Component } from "react";
import "./style.scss";

export default class DropDown extends Component {
  state = {
    presentValue: "",
    openDrop: false
  };

  componentDidMount() {
    const { current } = this.props;
    this.setState({
      presentValue: current,
      openDrop: false
    });
  }

  handleClick = (e, value) => {
    const { handleSelect } = this.props;
    const name = e.target.innerHTML;
    this.setState({
      presentValue: name,
      openDrop: false
    });
    handleSelect(value);
  };

  revileDropDown = () => {
    this.setState(prevState => ({
      openDrop: !prevState.openDrop
    }));
  };

  render() {
    const { openDrop, presentValue } = this.state;
    const { option, current } = this.props;

    const options = option.filter(option => option.name !== current);

    if (options.length <= 0) return <div>loading</div>;
    const pair = options.map(option => (
      <button
        className="options"
        type="button"
        key={option.id}
        value={option.value}
        onClick={e => this.handleClick(e, option.value)}
      >
        {option.name}
      </button>
    ));
    return (
      <div className={`dropDown ${openDrop ? "open" : "close-drop"}`}>
        <button
          className={`currentValue ${openDrop ? "open" : "close"}`}
          type="button"
          onClick={this.revileDropDown}
        >
          <p>{presentValue ? presentValue : current}</p>
        </button>
        <div className={`dropDownButtons ${openDrop ? "open" : "close"}`}>
          {pair}
        </div>
      </div>
    );
  }
}
