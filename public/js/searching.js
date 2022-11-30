
const tier_emblem = [
  "Emblem_Unrank.png",
  "Emblem_Iron.png",
  "Emblem_Silver.png",
  "Emblem_Gold.png",
  "Emblem_Platinum.png",
  "Emblem_Diamond.png",
  "Emblem_Master.png",
  "Emblem_Grandmaster.png",
  "Emblem_Challenger.png",
  "Emblem_Bronze.png",
];

const tier_id = {
  IRON: 1,
  SILVER: 2,
  GOLD: 3,
  PLATINUM: 4,
  DIAMOND: 5,
  MASTER: 6,
  GRANDMASTER: 7,
  CHALLENGER: 8,
  BRONZE: 9,
};

function getSpellName(spellId) {
  if (spellId === 21) return "SummonerBarrier";
  if (spellId === 1) return "SummonerBoost";
  if (spellId === 14) return "SummonerDot";
  if (spellId === 3) return "SummonerExhaust";
  if (spellId === 4) return "SummonerFlash";
  if (spellId === 6) return "SummonerHaste";
  if (spellId === 7) return "SummonerHeal";
  if (spellId === 13) return "SummonerMana";
  if (spellId === 30) return "SummonerPororecall";
  if (spellId === 31) return "SummonerPorothrow";
  if (spellId === 11) return "SummonerSmite";
  if (spellId === 32) return "SummonerSnowball";
  if (spellId === 12) return "SummonerTeleport";
}
const api = "RGAPI-2e1ce1cf-6ec5-41ae-956a-d38e84664106";
//440 = 자유랭크 , 420 = 솔로랭크, 나머지 => 일반
window.addEventListener("load", () => {
  fetch("/search", { method: "GET" })
    .then((res) => res.json())
    .then((nickname) => {
      const url =
        "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
        nickname["nick"] +
        "?api_key=RGAPI-2e1ce1cf-6ec5-41ae-956a-d38e84664106";
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (this.status == 200) {
          result = this.responseText;
          const user_info = JSON.parse(result);
          const id = user_info["id"];
          const nick = user_info["name"];
          const icon = user_info["profileIconId"];
          const level = user_info["summonerLevel"];
          const puuid = user_info["puuid"];
          document.getElementById("user-name").innerHTML = nick;
          document.getElementById(
            "user-level"
          ).innerHTML = `level: ${level}`;

          const img_src =
            "http://ddragon.leagueoflegends.com/cdn/12.21.1/img/profileicon/" +
            icon +
            ".png";
          let img = document.createElement("img");
          img.src = img_src;
          img.width = 100;
          if (
            document.getElementById("user-icon").childElementCount === 0
          ) {
            document.getElementById("user-icon").appendChild(img);
          }
          const url2 =
            "https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
            id +
            "?api_key=RGAPI-2e1ce1cf-6ec5-41ae-956a-d38e84664106";
          const xmlhttp2 = new XMLHttpRequest();
          xmlhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              const user_info2 = JSON.parse(this.responseText);

              if (user_info2.length === 0) {
                //솔랭, 자랭 둘다 unranked일때
                document.getElementById("user-tier-solo").textContent =
                  "UNRANKED";
                document.getElementById("user-tier-free").textContent =
                  "UNRANKED";
                document.getElementById("win-rate-solo").remove();
                document.getElementById("win-rate-free").remove();
                document.getElementById("tier-img-solo").src =
                  "./css/img/Emblem_Unrank.png";
                document.getElementById("tier-img-solo").width = 80;
                document.getElementById("tier-img-free").src =
                  "./css/img/Emblem_Unrank.png";
                document.getElementById("tier-img-free").width = 80;
              } else if (user_info2.length === 1) {
                if (user_info2[0]["queueType"] === "RANKED_SOLO_5x5") {
                  //솔랭만
                  const tier = user_info2[0]["tier"];
                  const rank = user_info2[0]["rank"];
                  const point = user_info2[0]["leaguePoints"];
                  const win = user_info2[0]["wins"];
                  const lose = user_info2[0]["losses"];

                  document.getElementById("user-tier-solo").textContent =
                    tier;
                  document.getElementById("user-rank-solo").textContent =
                    rank;
                  document.getElementById("user-point-solo").innerHTML =
                    point;
                  document.getElementById("user-win-solo").innerHTML =
                    win;
                  document.getElementById("user-loss-solo").innerHTML =
                    lose;

                  document.getElementById("user-tier-free").textContent =
                    "UNRANKED";
                  document.getElementById("win-rate-free").remove();

                  let link = "./css/img/" + tier_emblem[tier_id[tier]];
                  document.getElementById("tier-img-solo").src = link;
                  document.getElementById("tier-img-solo").width = 80;

                  document.getElementById("tier-img-free").src =
                    "./css/img/Emblem_Unrank.png";
                  document.getElementById("tier-img-free").width = 100;
                } else {
                  //자랭만
                  const tier = user_info2[0]["tier"];
                  const rank = user_info2[0]["rank"];
                  const point = user_info2[0]["leaguePoints"];
                  const win = user_info2[0]["wins"];
                  const lose = user_info2[0]["losses"];

                  document.getElementById("user-tier-free").textContent =
                    tier;
                  document.getElementById("user-rank-free").textContent =
                    rank;
                  document.getElementById("user-point-free").innerHTML =
                    point;
                  document.getElementById("user-win-free").innerHTML =
                    win;
                  document.getElementById("user-loss-free").innerHTML =
                    lose;

                  document.getElementById("user-tier-solo").textContent =
                    "UNRANKED";
                  document.getElementById("win-rate-solo").remove();

                  let link = "./css/img/" + tier_emblem[tier_id[tier]];
                  document.getElementById("tier-img-free").src = link;
                  document.getElementById("tier-img-free").width = 80;

                  document.getElementById("tier-img-solo").src =
                    "./css/img/Emblem_Unrank.png";
                  document.getElementById("tier-img-solo").width = 80;
                }
              } else {
                //둘다 있을때
                const tier = user_info2[0]["tier"];
                const rank = user_info2[0]["rank"];
                const point = user_info2[0]["leaguePoints"];
                const win = user_info2[0]["wins"];
                const lose = user_info2[0]["losses"];

                if (user_info2[0]["queueType"] === "RANKED_SOLO_5x5") {
                  document.getElementById("user-tier-solo").textContent =
                    tier;
                  document.getElementById("user-rank-solo").textContent =
                    rank;
                  document.getElementById("user-point-solo").innerHTML =
                    point;
                  document.getElementById("user-win-solo").innerHTML =
                    win;
                  document.getElementById("user-loss-solo").innerHTML =
                    lose;

                  let link = "./css/img/" + tier_emblem[tier_id[tier]];
                  document.getElementById("tier-img-solo").src = link;
                  document.getElementById("tier-img-solo").width = 80;
                } else {
                  document.getElementById("user-tier-free").textContent =
                    tier;
                  document.getElementById("user-rank-free").textContent =
                    rank;
                  document.getElementById("user-point-free").innerHTML =
                    point;
                  document.getElementById("user-win-free").innerHTML =
                    win;
                  document.getElementById("user-loss-free").innerHTML =
                    lose;

                  let link = "./css/img/" + tier_emblem[tier_id[tier]];
                  document.getElementById("tier-img-free").src = link;
                  document.getElementById("tier-img-free").width = 80;
                }
                const tier1 = user_info2[1]["tier"];
                const rank1 = user_info2[1]["rank"];
                const point1 = user_info2[1]["leaguePoints"];
                const win1 = user_info2[1]["wins"];
                const lose1 = user_info2[1]["losses"];
                if (user_info2[1]["queueType"] === "RANKED_FLEX_SR") {
                  document.getElementById("user-tier-free").textContent =
                    tier1;
                  document.getElementById("user-rank-free").textContent =
                    rank1;
                  document.getElementById("user-point-free").innerHTML =
                    point1;
                  document.getElementById("user-win-free").innerHTML =
                    win1;
                  document.getElementById("user-loss-free").innerHTML =
                    lose1;

                  let link = "./css/img/" + tier_emblem[tier_id[tier1]];
                  document.getElementById("tier-img-free").src = link;
                  document.getElementById("tier-img-free").width = 80;
                } else {
                  document.getElementById("user-tier-solo").textContent =
                    tier1;
                  document.getElementById("user-rank-solo").textContent =
                    rank1;
                  document.getElementById("user-point-solo").innerHTML =
                    point1;
                  document.getElementById("user-win-solo").innerHTML =
                    win1;
                  document.getElementById("user-loss-solo").innerHTML =
                    lose1;

                  let link = "./css/img/" + tier_emblem[tier_id[tier1]];
                  document.getElementById("tier-img-solo").src = link;
                  document.getElementById("tier-img-solo").width = 80;
                }
              }
            }
          };
          xmlhttp2.open("GET", url2, true);
          xmlhttp2.send();

          const url3 =
            "https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" +
            puuid +
            "/ids?start=0&count=10&api_key=RGAPI-2e1ce1cf-6ec5-41ae-956a-d38e84664106";
          const xmlhttp3 = new XMLHttpRequest();
          xmlhttp3.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              const user_info3 = JSON.parse(this.responseText);
              for (let i = 0; i < 10; i++) {
                const matchID = user_info3[i];
                const url4 =
                  "https://asia.api.riotgames.com/lol/match/v5/matches/" +
                  matchID +
                  "?api_key=RGAPI-2e1ce1cf-6ec5-41ae-956a-d38e84664106";
                const xmlhttp4 = new XMLHttpRequest();
                xmlhttp4.onreadystatechange = function () {
                  if (this.readyState == 4 && this.status == 200) {
                    const user_info4 = JSON.parse(this.responseText);
                    for (let j = 0; j < 10; j++) {
                      const user = user_info4["info"]["participants"][j];
                      if (user["puuid"] === puuid) {
                        const championId = user["championName"];
                        const kills = user["kills"];
                        const deaths = user["deaths"];
                        const assists = user["assists"];
                        const win = user["win"];
                        let match_history =
                          document.getElementById("match-history");
                        if (win) {
                          match_history.children[
                            i
                          ].children[0].textContent = "승";
                          match_history.children[
                            i
                          ].children[0].setAttribute("class", "win");
                        } else {
                          match_history.children[
                            i
                          ].children[0].textContent = "패";
                          match_history.children[
                            i
                          ].children[0].setAttribute("class", "lose");
                        }
                        const queueId = user_info4["info"]["queueId"];
                        if (queueId === 440) {
                          //자유랭크
                          match_history.children[
                            i
                          ].children[1].textContent = "자유랭크";
                        } else if (queueId === 420) {
                          //솔로랭크
                          match_history.children[
                            i
                          ].children[1].textContent = "솔로랭크";
                        } else {
                          //일반
                          match_history.children[
                            i
                          ].children[1].textContent = "일반    ";
                        }
                        let img = document.createElement("img");
                        img.src =
                          "https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/" +
                          championId +
                          ".png";
                        img.width = 50;
                        if (
                          match_history.children[i].children[2]
                            .childElementCount === 0
                        ) {
                          match_history.children[
                            i
                          ].children[2].appendChild(img);
                        }

                        match_history.children[
                          i
                        ].children[3].textContent =
                          kills + "/" + deaths + "/" + assists;

                        let spell_0 = document.createElement("img");
                        let sp0 = getSpellName(user["summoner1Id"]);
                        spell_0.src =
                          "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/" +
                          sp0 +
                          ".png";
                        spell_0.width = 20;
                        let spell_1 = document.createElement("img");
                        let sp1 = getSpellName(user["summoner2Id"]);
                        if (
                          match_history.children[i].children[4]
                            .children[0].childElementCount === 0
                        ) {
                          match_history.children[
                            i
                          ].children[4].children[0].appendChild(spell_0);
                        }
                        spell_1.src =
                          "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/" +
                          sp1 +
                          ".png";
                        spell_1.width = 20;
                        if (
                          match_history.children[i].children[4]
                            .children[1].childElementCount === 0
                        ) {
                          match_history.children[
                            i
                          ].children[4].children[1].appendChild(spell_1);
                        }
                        let item0 = document.createElement("img");
                        let item1 = document.createElement("img");
                        let item2 = document.createElement("img");
                        let item3 = document.createElement("img");
                        let item4 = document.createElement("img");
                        let item5 = document.createElement("img");
                        item0.src =
                          "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" +
                          user["item0"] +
                          ".png";
                        item1.src =
                          "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" +
                          user["item1"] +
                          ".png";
                        item2.src =
                          "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" +
                          user["item2"] +
                          ".png";
                        item3.src =
                          "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" +
                          user["item3"] +
                          ".png";
                        item4.src =
                          "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" +
                          user["item4"] +
                          ".png";
                        item5.src =
                          "http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/" +
                          user["item5"] +
                          ".png";
                        if (!user["item0"]) {
                          item0.src = "./css/img/-.png";
                        }
                        if (!user["item1"]) {
                          item1.src = "./css/img/-.png";
                        }
                        if (!user["item2"]) {
                          item2.src = "./css/img/-.png";
                        }
                        if (!user["item3"]) {
                          item3.src = "./css/img/-.png";
                        }
                        if (!user["item4"]) {
                          item4.src = "./css/img/-.png";
                        }
                        if (!user["item5"]) {
                          item5.src = "./css/img/-.png";
                        }

                        item0.width = 18;
                        item1.width = 18;
                        item2.width = 18;
                        item3.width = 18;
                        item4.width = 18;
                        item5.width = 18;
                        if (
                          match_history.children[i].children[5]
                            .children[0].childElementCount === 0
                        ) {
                          match_history.children[
                            i
                          ].children[5].children[0].appendChild(item0);
                        }
                        if (
                          match_history.children[i].children[5]
                            .children[1].childElementCount === 0
                        ) {
                          match_history.children[
                            i
                          ].children[5].children[1].appendChild(item1);
                        }
                        if (
                          match_history.children[i].children[5]
                            .children[2].childElementCount === 0
                        ) {
                          match_history.children[
                            i
                          ].children[5].children[2].appendChild(item2);
                        }
                        if (
                          match_history.children[i].children[5]
                            .children[3].childElementCount === 0
                        ) {
                          match_history.children[
                            i
                          ].children[5].children[3].appendChild(item3);
                        }
                        if (
                          match_history.children[i].children[5]
                            .children[4].childElementCount === 0
                        ) {
                          match_history.children[
                            i
                          ].children[5].children[4].appendChild(item4);
                        }
                        if (
                          match_history.children[i].children[5]
                            .children[5].childElementCount === 0
                        ) {
                          match_history.children[
                            i
                          ].children[5].children[5].appendChild(item5);
                        }
                      }
                    }
                  }
                };
                xmlhttp4.open("GET", url4, true);
                xmlhttp4.send();
              }
            }
          };
          xmlhttp3.open("GET", url3, true);
          xmlhttp3.send();
        } else {
          console.log("소환사를 찾을 수 없습니다.");
        }
      };

      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    });
});
