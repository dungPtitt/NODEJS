import express from "express";
import homeController from "../controlers/homeControllers";
import userController from "../controlers/userController";
import tourController from "../controlers/tourController";
import audienceController from "../controlers/audienceController";

let router = express.Router()

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage)

  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCURD);
  router.get("/display-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  // Viet API
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-user", userController.handleGetUser);
  router.post("/api/create-user", userController.handleCreateUser);
  router.put("/api/update-user", userController.handleUpdateUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  router.get("/api/get-allcode", userController.handleGetAllcode);
  router.get("/api/get-tour", tourController.handleGetTour);
  router.post("/api/create-tour", tourController.handleCreateTour);
  // audience
  router.post("/api/audience-booking-ticket", audienceController.postBookingTicket);

  router.get("/api/get-member", userController.handleGetMember);
  return app.use("/", router);
}

module.exports = initWebRoutes