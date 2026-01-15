import AXIOS from "../lib/axios";

export class FasilitasService {
  // create
  static async create(req) {
    // get response
    const response = await AXIOS.post("/fasilitas/create", req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // read
  static async read() {
    // get response
    const response = await AXIOS.get("/fasilitas/read").then((res) => res.data);

    // return
    return response;
  }

  // detail
  static async detail(id) {
    // get response
    const response = await AXIOS.get(`/fasilitas/detail/${id}`).then(
      (res) => res.data
    );

    // return
    return response;
  }

  // read by filter
  static async readByFilter(filter) {
    // get response
    const response = await AXIOS.get(`/fasilitas/readByFilter/${filter}`).then(
      (res) => res.data
    );

    // return
    return response;
  }

  // update
  static async update(req, id) {
    // get response
    const response = await AXIOS.patch(`/fasilitas/update/${id}`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // delete

  static async delete(id) {
    // get response
    const response = await AXIOS.delete(`/fasilitas/delete/${id}`).then(
      (res) => res.data
    );

    // return
    return response;
  }
}
