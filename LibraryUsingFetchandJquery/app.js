console.log("connected");
document.querySelector("table").style.display = "none";

document.querySelector("button").addEventListener("click", function () {
  document.querySelector("table").style.display = "block";
  var userinput = document.querySelector("input").value;
  var books = localStorage.getItem(userinput);
  if (books != null) {
    console.log("getting data from localstorage");
    var fromLS = JSON.parse(books);
    var arr = fromLS;
    console.log(fromLS);

    for (x in fromLS) {
      if (arr[x].first_name == userinput) {
        document.querySelector("tr").insertAdjacentHTML(
          "afterend",
          `<td>${arr[x].id}</td>
          <td>${arr[x].email}</td>
          <td>${arr[x].first_name}</td>
          <td>${arr[x].last_name}</td>
          <td><img src="${arr[x].avatar}" width="200" height="200" alt="Girl in a jacket"></td>`
        );
      }
    }
  } else {
    console.log("getting data from Server");
    var ww = [];
    fetch("https://reqres.in/api/users")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        var arr = response.data;
        console.log(arr);

        for (x in arr) {
          console.log(x, arr[x]);
          if (arr[x].first_name == userinput) {
            document.querySelector("tr").insertAdjacentHTML(
              "afterend",
              `<td>${arr[x].id}</td>
              <td>${arr[x].email}</td>
              <td>${arr[x].first_name}</td>
              <td>${arr[x].last_name}</td>
              <td><img src="${arr[x].avatar}" width="200" height="200" alt="Girl in a jacket"></td>`
            );

            ww.push(arr[x]);
          }
        }
        //document.querySelector("tr").insertAdjacentHTML('beforeend','<br>')
        console.log(ww);
        var p = JSON.stringify(ww);
        localStorage.setItem(`${userinput}`, p);
      });
  }
});
