
const labModel = require("../../../DB/model/Lab");

const getLabs = async (req, res) => {
  const lab = await labModel.find({});

  res.render("admin/labs", { lab, title: "Lab" });
};

const detailsPage = async (req, res) => {
  const test = await labModel.findById(req.params.id);
  res.render("admin/lab_details", { title: "Test Details", test });
};

const getUpdateLab = async (req, res) => {
  const wrongPassword = req.flash("wrongPassword")[0];
  const catchErr = req.flash("catchErr")[0];
  const userExist = req.flash("userExist")[0];
  let validationErr = req.flash("validationErr")[0];
  if (validationErr) {
    validationErr = validationErr.map((err) => {
      return err.path[0];
    });
  }
  const lab = await labModel.findById(req.params.id);
  res.render("admin/lab_edit", {
    userExist,
    catchErr,
    validationErr,
    wrongPassword,
    lab,
    title: "Test Update",
  });
};

const updateLab = async (req, res) => {
  try {
    if (req.fileErr) {
      req.flash("fileErr", true);
      res.redirect("/edit");
    } else {
      const { testName, testResult, status } = req.body;
      const test = await labModel.findById(req.params.id);
      console.log(test);
      if (!test) {
        res.redirect(`back`);
      } else {
        const imgUrls = req.files.map((file) => {
          return file.filename;
        });

        const tests = testName.map((test, index) => ({
          name: test,
          result: testResult[index],
          test_img: `${req.fileDestination}/${imgUrls[index]}`,
        }));

        await labModel.findByIdAndUpdate(
          req.params.id,
          { tests, status },
          { new: true }
        );

        res.redirect(`edit`);
      }
    }
  } catch (error) {
    req.flash("catchErr", "server error");
    res.redirect(`edit`);
  }
};

const deleteLab = async (req, res) => {
  try {
    await labModel.findByIdAndDelete({ _id: req.params.id });
    res.redirect("admin/labs");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUpdateLab,
  updateLab,
  deleteLab,
  getLabs,
  detailsPage,
};
