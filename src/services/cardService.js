import http from  './httpService';
import {apiUrl} from '../config.json';

export function createCard(card) {
    return http.post(`${apiUrl}/cards`, card)
}

export function updateCard(id, card) {
    return http.put(`${apiUrl}/cards/${id}`, card);
}


export function getCard(id) {
    return http.get(`${apiUrl}/cards/${id}`);
}

export function getMyCard() {
    return http.get(`${apiUrl}/cards/my-cards`);
}
export function getallCards() {
    return http.get(`${apiUrl}/cards/all-cards`);
}

export function deletecard(id) {
    return http.delete(`${apiUrl}/cards/${id}`);
}

export function deletefavcard(id) {
    return http.delete(`${apiUrl}/users/${id}`);
}

export function getFavorites() {
    return http.get(`${apiUrl}/users/Favorites-cards`);
}

export function addFavToUser(id,userid) {
    return http.post(`${apiUrl}/users/${id}`,userid);
 }
 /*export function AddToCards() {
    return http.patch(`${apiUrl}/users/cards`);
}
*/
export default {
    getCard,
    getFavorites,
    updateCard,
    deletecard,
    getallCards,
    createCard,
    getMyCard,
    deletefavcard,
    addFavToUser,
};