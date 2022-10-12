import tourService from '../services/tourService';

let handleGetTour = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      errMassage: "Missing input parametes"
    })
  }
  //id = "All" => tat ca user
  //id = ...
  let response = await tourService.getTour(id)
  return res.status(200).json(response)
}

let handleCreateTour = async (req, res) => {
  let data = req.body;
  if (!data) {
    return res.status(200).json({
      errCode: 1,
      errMassage: "Missing info"
    })
  }
  let massage = await tourService.createTour(data);
  return res.status(200).json(massage)
}

module.exports = {
  handleGetTour: handleGetTour,
  handleCreateTour: handleCreateTour,
}