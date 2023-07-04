// to get current year
function getYear() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  document.querySelector("#displayYear").innerHTML = currentYear;
}

// getYear();

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
  loop: true,
  margin: 0,
  dots: false,
  nav: true,
  navText: [],
  autoplay: true,
  autoplayHoverPause: true,
  navText: [
    '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    '<i class="fa fa-angle-right" aria-hidden="true"></i>',
  ],
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 2,
    },
  },
});

/** google_map js **/
function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(40.712775, -74.005973),
    zoom: 18,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

$(document).ready(function () {
  // When the top-up button is clicked
  $(".button").click(function () {
    // Get the top offset of the target section
    var targetOffset = $("#department").offset().top;
    // Scroll to the target section
    $("html, body").animate({ scrollTop: targetOffset }, "slow");
    // Add your code for top-up action here
  });

  $("#toggle-password").click(function () {
    var passwordField = $("#password");
    var passwordFieldType = passwordField.attr("type");
    if (passwordFieldType == "password") {
      passwordField.attr("type", "text");
      $(this).removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      passwordField.attr("type", "password");
      $(this).removeClass("fa-eye-slash").addClass("fa-eye");
    }
    console.log("clicked");
  });

  $("#toggle-confirm-password").click(function () {
    var confirmPasswordField = $("#confirm-password");
    var confirmPasswordFieldType = confirmPasswordField.attr("type");
    if (confirmPasswordFieldType == "password") {
      confirmPasswordField.attr("type", "text");
      $(this).removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      confirmPasswordField.attr("type", "password");
      $(this).removeClass("fa-eye-slash").addClass("fa-eye");
    }
    console.log("clicked2");
  });

  // select all links with class "link"
  var links = $(".nav-link");

  // add click event listener to each link
  links.on("click", function () {
    // remove "active" class from all links
    links.removeClass("active");
    // add "active" class to clicked link
    $(this).addClass("active");
  });

  $(".delete-confirmation").on("click", function (e) {
    e.preventDefault();
    // get the ID of the item to delete from the data-id attribute
    var id = $(this).data("id");

    // display a confirmation dialog box using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // make an AJAX call to delete the item
        $.ajax({
          url: "/admin/doctors/" + id,
          type: "DELETE",
          success: function (result) {
            // do something with the result
          },
          error: function (err) {
            // handle the error
          },
        });
        location.reload();
      }
    });
  });

  $(".delete-confirmation2").on("click", function (e) {
    e.preventDefault();
    // get the ID of the item to delete from the data-id attribute
    var id = $(this).data("id");

    // display a confirmation dialog box using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // make an AJAX call to delete the item
        $.ajax({
          url: "/admin/appointments/" + id,
          type: "DELETE",
          success: function (result) {
            // do something with the result
          },
          error: function (err) {
            // handle the error
          },
        });
        location.reload();
      }
    });
  });

  $(".delete-confirmation3").on("click", function (e) {
    e.preventDefault();
    // get the ID of the item to delete from the data-id attribute
    var id = $(this).data("id");

    // display a confirmation dialog box using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // make an AJAX call to delete the item
        $.ajax({
          url: "/admin/labs/" + id,
          type: "DELETE",
          success: function (result) {
            // do something with the result
          },
          error: function (err) {
            // handle the error
          },
        });
        location.reload();
      }
    });
  });

  $(".delete-confirmation4").on("click", function (e) {
    e.preventDefault();
    // get the ID of the item to delete from the data-id attribute
    var id = $(this).data("id");

    // display a confirmation dialog box using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // make an AJAX call to delete the item
        $.ajax({
          url: "/admin/inventory/" + id,
          type: "DELETE",
          success: function (result) {
            // do something with the result
          },
          error: function (err) {
            // handle the error
          },
        });
        location.reload();
      }
    });
  });

  $("#add-result").click(function () {
    var html = ` <div class=" mb-3 border p-2" id="inputFormRow">
    <label for="test" class="form-label"
    >Test Name</label
    >
    <i class="fas fa-minus-circle minus " id="remove"></i>
    <input
      type="text"
      class="form-control"
      id="test"
      name="testName[]"
      placeholder="example: Blood glucose"
      value=""
    />
  </div>
  </div>
  `;

    $("#Row").append(html);
  });

  // remove row
  $(document).on("click", "#remove", function () {
    $(this).closest("#inputFormRow").remove();
  });

  $("#add").click(function () {
    var html = ` <div class="d-flex flex-wrap border border-1 p-2 mb-2 " id="inputFormRow">
    <div class="w-45 me-5 mb-3">
      <label for="medicine" class="form-label"
        >Medicine</label
      >
      <input
        type="text"
        class="form-control"
        id="medicine"
        name="medicine[]"
        placeholder="medicine: 'Ibuprofen'"
        value=""
      />
    </div>
    <div class="w-45 mb-3">
      <label for="dosage" class="form-label">Dosage</label>
      <input
        type="text"
        class="form-control"
        id="Dosage"
        name="dosage[]"
        placeholder="dosage: '400mg'"
        value=""
      />
    </div>
    <div class="w-30 me-2">
      <label for="frequency" class="form-label"
        >Frequency</label
      >
      <input
        type="text"
        class="form-control"
        id="Frequency"
        name="frequency[]"
        placeholder="frequency: 'twice daily'"
        value=""
      />
    </div>
    <div class="w-30 me-2">
      <label for="start_date" class="form-label"
        >Start Date</label
      >
      <input
        type="date"
        class="form-control"
        id="start_date"
        name="start_date[]"
        value=""
      />
    </div>
    <div class="w-30 me-2 ">
      <label for="end_Date" class="form-label"
        >End Date</label
      >
      <input
        type="Date"
        class="form-control"
        id="end_Date"
        name="end_date[]"
        value=""
      />
    </div>
    <div class="w-5 d-flex align-items-center">
      <i class="fas fa-minus-circle d-inline-block ms-5 mt-5 minus" id="removeRow"></i>
    </div>
  </div>
  `;

    $("#newRow").append(html);
  });

  $("#add-2").click(function () {
    let html = `     <div
    class="d-flex border border-1 p-2 w-30 flex-wrap rounded-2"
    id="inputFormRow"
  >
    <div class="me-2 mb-3">
      <label for="appointment_date" class="form-label"
        >Add Date</label
      >
      <input
        type="date"
        class="form-control"
        id="appointment_date"
        name="date[]"
        value=""
      />
    </div>
    <div class="me-2">
      <label for="time" class="form-label">Pick Time</label>
      <input
        type="time"
        class="form-control"
        id="time"
        name="time[]"
        value=""
      />
    </div>
    <div class="w-5 d-flex align-items-center ms-5">
      <i
        class="fas fa-minus-circle d-inline-block ms-5 mt-5 minus"
        id="removeRow"
      ></i>
    </div>
  </div>
    
  `;

    $("#newRow2").append(html);
  });
  // remove row
  $(document).on("click", "#removeRow", function () {
    $(this).closest("#inputFormRow").remove();
  });

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  const input = document.querySelector(".input-img");
  const image = document.querySelector(".imgPreview");

  function readURL(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        image.setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  if (input) {
    input.onchange = function () {
      readURL(this);
    };
  }

  Fancybox.bind();

  const increase = $("#plus");
  const decrease = $("#minus");
  const quantity = $("#quantity");

  increase.on("click", function () {
    let value = parseInt(quantity.val());
    quantity.val(value + 1);
  });
  decrease.on("click", function () {
    let value = parseInt(quantity.val());
    quantity.val(value - 1);
  });


  $("button#book").on("click", function (e) {
    e.preventDefault();
    // get the ID of the item to delete from the data-id attribute
    var id = $(this).data("id");

    // display a confirmation dialog box using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, book it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // make an AJAX call to delete the item
        $.ajax({
          url: "/doctors/appointments/details/" + id,
          type: "POST",
          success: function (result) {
            // do something with the result
          },
          error: function (err) {
            // handle the error
          },
        });
        location.reload();
      }
    });
  });


  $(".delAppointment").on("click", function (e) {
    e.preventDefault();
    // get the ID of the item to delete from the data-id attribute
    var id = $(this).data("id");
    console.log(id);
    // display a confirmation dialog box using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // make an AJAX call to delete the item
        $.ajax({
          url: "/admin/doctors/appointments/" + id,
          type: "DELETE",
          success: function (result) {
            // do something with the result
          },
          error: function (err) {
            // handle the error
          },
        });
        location.reload();
      }
    });

  });


});
