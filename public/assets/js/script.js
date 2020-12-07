var searchInput;



$(function () {
  $("#search-btn").on("click", function (e) {
    var dropDownOption = $("#dropDownOptions :selected").val();
    var searchInput = $("#cocktailSearch").val();
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: `/api/${dropDownOption}/${searchInput}`,
      success: function (result) {
        window.location.replace(`/api/${dropDownOption}/${searchInput}`);
      },
      error: function (result) {
        alert('error');
      }
    });
  });
});

// $(function () {
//   $("#saveBtn").on("click", function (e) {
//     var drinkId = $("#dropDownOptions :selected").val();
//     var searchInput = $("#cocktailSearch").val();
//     e.preventDefault();
//     $.ajax({
//       type: "GET",
//       url: `/api/${dropDownOption}/${searchInput}`,
//       success: function (result) {
//         window.location.replace(`/api/${dropDownOption}/${searchInput}`);
//       },
//       error: function (result) {
//         alert('error');
//       }
//     });
//   });
// });


$(function () {
  $(".saveBtn").on("click", function (e) {
    // e.preventDefault();
    console.log(e);
    // console.log("hello bitch face");
    // var drinkId = $(this.id);
    // console.log(drinkId);
    console.log(this.id);
    var searchInput = $("#cocktailSearch").val();
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: `/api/drinks/create`,
      data: {
        drinkId: this.id
      },
      success: function (result) {
        // window.location.replace(`/api/savedDrinks`);
      },
      error: function (result) {
        alert('error');
      }
    });
  });
});