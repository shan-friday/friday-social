import { EXTENSION_INSTALLED, EXTENSION_NOT_INSTALLED } from '../actions/types';

const initialState = {
    isExtensionInstalled: false
};

// eslint-disable-next-line
export default function (state = initialState, action) {
    switch (action.type) {
        case EXTENSION_INSTALLED:
            return {
                ...state,
                isExtensionInstalled: true
            };
        case EXTENSION_NOT_INSTALLED:
            return {
                isExtensionInstalled: false
            };
        default:
            return state;
    }
}