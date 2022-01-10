import {
    GENEALOGY_TREE,
  
} from '../Utils/constant';
import { apiurl, findServer } from '../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';

export const GetGenealogyTree = (name, id) => async dispatch => {
    try {
        axios({
                method: 'POST',
                url: apiurl + 'genealogyTree.php',
                data: JSON.stringify({
                    "username": id == 1 ? name : JSON.parse(localStorage.getItem("UserName"))
                })
            })
            .then((response) => {
                dispatch({
                    type: GENEALOGY_TREE,
                    payload: response.data.Response
                })
            })
    } catch (err) {}
}