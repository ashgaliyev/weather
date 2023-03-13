import axios from "axios";

const csrfToken = () => {
  const element = document.querySelector("meta[name=csrf-token]");
  if (element) {
    return element.content;
  }
  return null;
};

export const createPlace = place =>
  new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: "/places",
      data: { place },
      headers: {
        "X-CSRF-Token": csrfToken()
      }
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        if (error.response.status === 422) {
          resolve(error.response);
        } else {
          reject(error);
        }
      });
  });

export const updatePlace = place =>
  new Promise((resolve, reject) => {
    const { id, ...placeData } = place;
    axios({
      method: "PUT",
      url: `/places/${id}`,
      data: { place: placeData },
      headers: {
        "X-CSRF-Token": csrfToken()
      }
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        if (error.response.status === 422) {
          resolve(error.response);
        } else {
          reject(error);
        }
      });
  });

export const deletePlace = place =>
  new Promise((resolve, reject) => {
    axios({
      method: "DELETE",
      url: `/places/${place.id}`,
      headers: {
        "X-CSRF-Token": csrfToken()
      }
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });

export const updateTempUnit = unit =>
  new Promise((resolve, reject) => {
    axios({
      method: "PUT",
      url: "/update_temp_unit",
      data: { temp_unit: unit },
      headers: {
        "X-CSRF-Token": csrfToken()
      }
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
