let infoList = [];
window.onload = function () {
  fetch("/info", { method: "GET" })
    .then((res) => res.json())
    .then((user) => {
      for (let i = 0; i < user.length; i++) {
        ranking(
          user[i].name,
          user[i].nickname,
          user[i].tier,
          user[i].rank,
          user[i].point,
          user[i].depart
        );
      }
      infoList.sort(sortVal);
      printList(infoList);
    });
    $("select").change(function(){
        $(".item").remove();
        let selected = $("#depart option:checked").text();
        printList(infoList.filter(departPick));
    })

};
let selected = $("#depart option:checked").text();

function ranking(name, nickname, tier, rank, point, department) {
  let userInfo = {
    name: name,
    nickname: nickname,
    tier: tier,
    rank: rank,
    point: point,
    rankingVal: calcVal(rank, tier, point),
    department: department,
  };
  infoList.push(userInfo);
}

function printList(list) {
  let rankingList = document.querySelector("#print_list");

  for (let i = 0; i < list.length; i++) {
    let div = document.createElement("div");
    div.className = "item";
    let imgSrc = "";

    let divRank = document.createElement("div");
    divRank.className = "rank";
    let divName = document.createElement("div");
    divName.className = "name";
    let divImage = document.createElement("div");
    divImage.className = "image";
    let divNickName = document.createElement("div");
    divNickName.className = "nickname";
    let divTier = document.createElement("div");
    divTier.className = "tier";
    let divPoint = document.createElement("div");
    divPoint.className = "point";
    let divDepart = document.createElement("div");
    divDepart.className = "department";
    imgSrc = imgPick(list[i].tier);

    divRank.innerText = i + 1;
    divName.innerText = list[i].name;
    divImage.innerHTML = "<img src='" + imgSrc + "'></img>";
    divNickName.innerHTML = "&nbsp&nbsp&nbsp" + list[i].nickname;
    if (list[i].tier === "UNRANK") {
      divTier.innerText = list[i].tier;
    } else {
      divTier.innerText = list[i].tier + "  " + list[i].rank;
      divPoint.innerText = list[i].point;
    }
    divDepart.innerText = list[i].department;

    div.appendChild(divRank);
    div.appendChild(divImage);
    div.appendChild(divNickName);
    div.appendChild(divName);
    div.appendChild(divTier);
    div.appendChild(divPoint);
    div.appendChild(divDepart);

    rankingList.appendChild(div);
  }
}

function departPick(element){
    let selected = $("#depart option:checked").text();
    if(selected === "SKKU"){
        return true;
    }
    else if(element.department === selected){
        return true;
    }

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
    default:
      value += 70000;
      break;
  }
  return src;
}

function calcVal(rank, tier, point) {
  let value = 0;
  switch (tier) {
    case "IRON":
      value += 0;
      break;
    case "BRONZE":
      value += 10000;
      break;
    case "SILVER":
      value += 20000;
      break;
    case "GOLD":
      value += 30000;
      break;
    case "PLATINUM":
      value += 40000;
      break;
    case "DIAMOND":
      value += 50000;
      break;
    case "MASTER":
      value += 60000;
      break;
    case "UNRANK":
      value = 0;
      break;
    default:
      value += 70000;
      break;
  }
  switch (rank) {
    case "I":
      value += 4000;
      break;
    case "II":
      value += 3000;
      break;
    case "III":
      value += 2000;
      break;
    case "IV":
      value += 1000;
      break;
    default:
      value += 0;
      break;
  }
  if (point === "UNRANK") value = 0;
  else {
    value += point;
  }

  return value;
}
function sortVal(a, b) {
  return b.rankingVal - a.rankingVal;
}
