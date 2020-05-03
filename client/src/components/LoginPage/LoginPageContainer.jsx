import { connect } from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';
import { registrationUser } from '../../redux/thunk-creators/thunk-creators';


const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = (dispatch) => ({
  registrationUser: (data) => dispatch(registrationUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
