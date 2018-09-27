// Initialize Firebase
const config = {
  apiKey: "AIzaSyC21jdVBBF3t5XTJjQ4R_ZkPLyy-lREvEw",
  authDomain: "my-project-93863.firebaseapp.com",
  databaseURL: "https://my-project-93863.firebaseio.com",
  projectId: "my-project-93863",
  storageBucket: "my-project-93863.appspot.com",
  messagingSenderId: "961273993704"
};
firebase.initializeApp(config);

const database = firebase.database();

$("#formSubmitButton").on("click", function(event) {
  event.preventDefault();

  let name = $("#employeeNameInput").val().trim();
  let role = $("#roleInput").val().trim();
  let startDate = $("#startDateInput").val().trim();
  let monthlyRate = $("#monthlyRateInput").val().trim();

  let newEntry = {
    name: name,
    role: role,
    startDate: startDate,
    monthlyRate: monthlyRate
  }

  database.ref("/employeeInfo").push(newEntry);
});

database.ref("/employeeInfo").on("child_added", function(snapshot) {
  const snap = snapshot.val();
  const row = $("<tr>")

  console.log(snap.name)
  console.log(snap.role)
  console.log(snap.startDate)
  console.log(snap.monthlyRate)

  row.append("<td>" + snap.name + "</td>")
  row.append("<td>" + snap.role + "</td>")
  row.append("<td>" + snap.startDate + "</td>")
  row.append("<td>" + "$" + snap.monthlyRate + "</td>")
  row.append("<td>" + moment().diff(moment(snap.startDate, "MM/DD/YYYY"), "months") + " months" + "</td>")
  row.append("<td>" + "$" + parseInt(snap.monthlyRate) * moment().diff(moment(snap.startDate, "MM/DD/YYYY"), "months") + "</td>")

  $("#newInfo").append(row)


}, function(error) {
  console.log("Error: " + error.code);
});