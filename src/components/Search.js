import React, { Component } from 'react';
import { ErrorMessage } from 'formik';

class Search extends Component {
  state = {
    isOpen: false
  };

  handleChange = (e, field, setFieldValue) => {
    setFieldValue(field.name, e.target.value);
    this.props.fetchCountries(e.target.value);
    this.setState({
      isOpen: true
    });
  };

  handleClick = (e, field, setFieldValue) => {
    setFieldValue(field.name, e.target.innerHTML);
    this.props.fetchCountries(e.target.innerHTML);
    this.setState({
      isOpen: false
    });
  };

  render() {
    const { field, form: { setFieldValue }, ...props } = this.props;
    return (
      <React.Fragment>
        <input type="text" {...field} {...props} autoComplete="off" onChange={e => this.handleChange(e, field, setFieldValue)} />
        <div className={this.state.isOpen ? 'dropdown show': 'dropdown'}>
          {Boolean(this.props.countries.length) && this.props.countries.map(country => (
            <div key={country.name} className="dropdown-item" onClick={e => this.handleClick(e, field, setFieldValue)}>{country.name}</div>
          ))}
        </div>
        <ErrorMessage name={field.name} className="error" component="span" />
      </React.Fragment>
    );
  }
}

export default Search;