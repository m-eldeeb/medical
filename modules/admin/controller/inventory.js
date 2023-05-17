const medicine = require("../../../DB/model/Inventory");

const inventoryPage = async (req, res) => {
  const medicines = await medicine.find({});
  res.render("admin/inventory", { medicines, title: "Pharmacy" });
};

const getAddMedicine = (req, res) => {
  const oldInputs = req.flash("oldInputs")[0];
  const catchErr = req.flash("catchErr")[0];
  const saved = req.flash("saved")[0];

  res.render("admin/inventory_add", {
    oldInputs,
    catchErr,
    saved,
  });
};

const addMedicine = async (req, res) => {
  try {
    const { name, manufacturer, description, quantity, price, dosage } =
      req.body;

    const newMedicine = new medicine({
      name,
      manufacturer,
      description,
      quantity,
      price,
      dosage,
    });
    await newMedicine.save();

    req.flash("saved", true);
    res.redirect("/admin/inventory/medicine");
  } catch (error) {
    req.flash("catchErr", "server error");
    req.flash("oldInputs", req.body);
    res.redirect("/admin/doctors/medicine");
  }
};

const getUpdateMedicine = async (req, res) => {
  const catchErr = req.flash("catchErr")[0];
  const item = await medicine.findById(req.params.id);
  res.render("admin/inventory_edit", {
    catchErr,
    item,
    title: "Medicine update",
  });
};

const updateMedicine = async (req, res) => {
  try {
    const { name, manufacturer, description, quantity, price, dosage } =
      req.body;

    const medi = await medicine.findById(req.params.id);

    if (!medi) {
      req.flash("userExist", true);
      req.flash("oldInputs", req.body);
      res.redirect("/admin/inventory");
    } else {
      await medicine.findOneAndUpdate(
        { _id: req.params.id },
        { name, manufacturer, description, quantity, price, dosage },
        { new: true }
      );
      res.redirect(`edit`);
    }
  } catch (error) {
    req.flash("catchErr", "server error");
    res.redirect(`edit`);
  }
};

const deleteMedicine = async (req, res) => {
  try {
    await medicine.findByIdAndDelete({ _id: req.params.id });
    res.redirect("admin/inventory");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  inventoryPage,
  getAddMedicine,
  addMedicine,
  getUpdateMedicine,
  updateMedicine,
  deleteMedicine,
};
