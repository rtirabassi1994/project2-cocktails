var searchInput;

// dropdown function- Joe
$(function () {
  $(".dropdown-menu").on('click', 'a', function () {
      $("#dropdown").text($(this).text());
      $("#dropdown").val($(this).text());
  });
});


$(function () {
  $("#search-btn").on("click", function(e) {
    var searchInput = $("#cocktailSearch").val();
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: `/api/filter/${searchInput}`,
        // data: { 
        //     searchInput: $("#cocktailSearch").val()
        // },
        success: function(result) {
          console.log();
          // location.reload(result);
          // window.location.reload();
          window.location.replace(`/api/filter/${searchInput}`);
        },
        error: function(result) {
            alert('error');
        }
    });
});





$("#searchByIngredient").on("click", function(e) {
  e.preventDefault();

  var searchInput = $("#cocktailSearch").val();
  // console.log(searchInput);
  $.ajax({
      type: "GET",
      url: `/api/filter/${searchInput}`,
      // data: { 
      //     searchInput: $("#cocktailSearch").val()
      // },
      success: function(result) {
        // console.log(result);
        // location.reload(result);
        // window.location.reload();
        window.location.replace(`/api/filter/${searchInput}`);
      },
      error: function(result) {
          alert('error');
      }
  });
});




















  // $("#search-btn").on("click", function (event) {
  //   // event.preventDefault();
  //   // console.log(event);
  //   // console.log("===============");
  //   var searchParameters = {
  //     searchInput: "",
  //     dropDown: ""
  //   }
  //   var eggs = $(".dropdown-menu [.dropdown-item]").val();

    // searchParameters.searchInput = $("#cocktailSearch").val();
    
  //   // console.log(obj.searchInput);

  //   $.ajax("/api/find", {
  //     type: "GET",
  //     data: searchParameters
  //   }).then(function (result) {
  //       console.log("---");
  //       console.log(result);

  //       console.log("---");
  //       // location.reload(result);
  //     }
  //   );
  // });

  // $("#top5Drinks").on("click", function (event) {
  //   // event.preventDefault();
  //   console.log("===============");

  //   $.get("/top5", function(data) {
  //     // location.reload();
  //     // console.log(data);

  //   });


  // });

});