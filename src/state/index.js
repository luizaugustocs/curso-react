import {combineReducers} from 'redux'
import UsuarioReducer from './reducers/UsuarioReducer';


const rootReducer = combineReducers({
    usuario: UsuarioReducer
});


export default rootReducer;