import tourService from '../services/tourService';

let handleGetTour = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing input parametes"
    })
  } else {
    let response;
    if (limit == 'All') {
      response = await tourService.getAllTour();
    }
    response = await tourService.getTour(+limit)
    return res.status(200).json(response)
  }


  //id = "All" => tat ca user
  //id = ...

}

let handleEditTour = async (req, res) => {
  let data = req.body
  if (!data.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing input parametes"
    })
  } else {
    let response = await tourService.editTour(data)
    return res.status(200).json(response)
  }


  //id = "All" => tat ca user
  //id = ...

}

let handleGetAllTour = async (req, res) => {
  try {
    let response = await tourService.getAllTour();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let handleGetMemorableTour = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing input parametes"
    })
  }
  //id = "All" => tat ca user
  //id = ...
  let response = await tourService.getMemorableTour(+limit)
  return res.status(200).json(response)
}

let handleCreateTour = async (req, res) => {
  let data = req.body;
  if (!data) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing info"
    })
  }
  let message = await tourService.createTour(data);
  return res.status(200).json(message)
}
let handleDeleteTour = async (req, res) => {
  try {
    let idTour = req.body.id;
    // console.log(idTour)
    if (!idTour) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing input parameter"
      })
    } else {
      let response = await tourService.deleteTour(idTour);
      return res.status(200).json(response);
    }
  } catch (error) {
    console(error)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server"
    })
  }
}

module.exports = {
  handleGetTour: handleGetTour,
  handleCreateTour: handleCreateTour,
  handleEditTour: handleEditTour,
  handleGetMemorableTour: handleGetMemorableTour,
  handleDeleteTour: handleDeleteTour,
  handleGetAllTour: handleGetAllTour,
}