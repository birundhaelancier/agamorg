import { GENEALOGY_TREE } from '../Utils/constant';

export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GENEALOGY_TREE:
            return { ...state, GetGenealogyTree: payload }
        default:
            return state;
    }
};