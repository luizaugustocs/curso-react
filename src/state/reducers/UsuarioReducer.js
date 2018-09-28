import * as Types from '../types/UsuarioTypes';

const initialState = {
    usuarioAtual: undefined
};

const UsuarioReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch (type) {
    case Types.USUARIO_LOGIN:
        return {
            usuarioAtual: {...payload}
        };
    case Types.USUARIO_LOGOUT:
        return {
            usuarioAtual: undefined
        };
    case Types.USUARIO_UPDATE:
        return {
            usuarioAtual: {...payload}
        };
    default:
        return state;
    }
};

export default UsuarioReducer;