import IElementData from "../types/element.type";
import http from "../http-common";

const API_URL = "http://localhost:3110/api";

class ElementService {
  async callAPI(endpoint: string, method: string, headers: {}, data?: {}) {
    const response = await fetch(
      API_URL + endpoint,
      data
        ? {
            method: method,
            headers: headers,
            body: JSON.stringify(data),
          }
        : {
            method: method,
            headers: headers,
          }
    );
    return response.json();
  }

  async callDelete(endpoint: string, method: string, headers: {}) {
    await fetch(API_URL + endpoint, {
      method: method,
      headers: headers,
    });
  }

  async fetchElements(token: string) {
    return this.callAPI("/elements/", "GET", {
      "content-type": "application/json",
      accept: "application/json",
      authorization: "Bearer " + token,
    });
  }

  async getElementById(elementId: any, token: string) {
    return this.callAPI("/elements/" + elementId, "GET", {
      "content-type": "application/json",
      accept: "application/json",
      authorization: "Bearer " + token,
    });
  }

  async createElement(data: {}, token: string) {
    return this.callAPI(
      "/elements",
      "POST",
      {
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + token,
      },
      data
    );
  }

  async updateElement(data: {}, element: string, token: string) {
    return this.callAPI(
      "/elements/" + element,
      "PUT",
      {
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + token,
      },
      data
    );
  }

  async deleteElement(element: string, token: string) {
    return this.callDelete("/elements/" + element, "DELETE", {
      "content-type": "application/json",
      accept: "application/json",
      authorization: "Bearer " + token,
    });
  }

  getAllElementAxios() {
    return http.get<Array<IElementData>>("/elements");
  }

  getElementAxios(id: string) {
    return http.get<IElementData>(`/elements/${id}`);
  }

  createElementAxios(data: IElementData) {
    return http.post<IElementData>("/elements", data);
  }

  updateElementAxios(data: IElementData, id: any) {
    return http.put<any>(`/elements/${id}`, data);
  }

  deleteElementAxios(id: any) {
    return http.delete<any>(`/elements/${id}`);
  }

  deleteAllElementAxios() {
    return http.delete<any>(`/elements`);
  }

  findByTitleElementAxios(title: string) {
    return http.get<Array<IElementData>>(`/elements?title=${title}`);
  }

}

export default new ElementService();
