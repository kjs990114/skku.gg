window.addEventListener("load", () => {
  let today = new Date();
  document.getElementById("today").innerHTML =
    "Today: " +
    today.getFullYear() +
    "/" +
    (today.getMonth() + 1) +
    "/" +
    today.getDate();
  document.getElementById("midTop").innerHTML =
    "Welcome to " + window.localStorage.name + "'s rift!";
  document.getElementById("usrImg").src = imgPick(localStorage.tier);
  document.getElementById("name").innerHTML = "NAME: " + localStorage.name;
  document.getElementById("nick").innerHTML =
    "User ID: " + localStorage.nickname;
  document.getElementById("depart").innerHTML =
    "Depart: " + localStorage.depart;

  fetch("/counter", { method: "GET" })
    .then((res) => res.text())
    .then((count) => {
      let counter = document.getElementById("counter");
      counter.textContent = count;
    });

  loadChats();

  document.getElementById("submit").addEventListener("click", () => {
    let input = document.getElementById("chat");
    let chat = input.value;

    fetch("/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat }),
    }).then(() => {
      loadChats();
    });
    input.value = "";
  });

  document.getElementById("ranking").addEventListener("click",()=>{

  })
});

function loadChats() {
  fetch("/chats", { method: "GET" })
    .then((res) => res.json())
    .then((chats) => {
      let list = document.getElementById("chats");
      list.innerHTML = "";
      chats.forEach((chat) => {
        let li = document.createElement("div");
        li.className = "chatBox";
        li.innerHTML = chat;

        let del = document.createElement("div");
        del.id = "deleteBox";
        del.innerHTML = "X";
        del.onclick = () => {
          console.log($(this).parentNode)
        }
        li.appendChild(del);
        list.appendChild(li);
      });
    });
}

function imgPick(tier) {
  let src = "";
  switch (tier) {
    case "IRON":
      src = "./css/img/Emblem_Iron.png";
      break;
    case "BRONZE":
      src = "./css/img/Emblem_Bronze.png";
      break;
    case "SILVER":
      src = "./css/img/Emblem_Silver.png";
      break;
    case "GOLD":
      src = "./css/img/Emblem_Gold.png";
      break;
    case "PLATINUM":
      src = "./css/img/Emblem_Platinum.png";
      break;
    case "DIAMOND":
      src = "./css/img/Emblem_Diamond.png";
      break;
    case "MASTER":
      src = "./css/img/Emblem_Master.png";
      break;
    case "GRANDMASTER":
      src = "./css/img/Emblem_Grandmaster.png";
      break;
    case "CHALLENGER":
      src = "./css/img/Emblem_Challenger.png";
      break;
    case "UNRANK":
      src = "./css/img/Emblem_Unrank.png";
      break;
  }
  return src;
}
