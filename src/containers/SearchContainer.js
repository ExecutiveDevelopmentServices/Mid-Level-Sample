import { connect } from "react-redux";
import { apiFetch } from '../ducks/form';
import Search from '../components/Search';

const mapStateToProps = state => ({
  countries: state.formReducers.countries,
  error: state.formReducers.error
});

const mapDispatchToProps = dispatch => ({
  fetchCountries: name => dispatch(apiFetch(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);