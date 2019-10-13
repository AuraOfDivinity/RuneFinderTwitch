import React from "react";

import Button from "@material-ui/core/Button";

import RuneList from "../RuneList/RuneList";

class RuneOverview extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.loadData = this.loadData.bind(this);
    this.loadIngameData = this.loadIngameData.bind(this);
    this.runeDetailsArray = [];

    this.state = {
      runeDetailsArr: []
    };
  }

  componentDidMount() {
    fetch(
      "https://ddragon.leagueoflegends.com/cdn/9.17.1/data/en_US/runesReforged.json"
    )
      .then(res => res.json())
      .then(out => {
        this.setState({
          data: out
        });
      })
      .catch(err => console.error(err));
  }

  handleClick() {
    this.loadData().then(res => {
      let jsonObj = JSON.parse(res);

      this.setState({
        summonerId: jsonObj.id
      });

      this.loadIngameData(jsonObj.id).then(res => {
        let jsonObj1 = JSON.parse(res);
        // console.log(jsonObj1.participants);

        jsonObj1.participants.forEach(participantObj => {
          if (participantObj.summonerId === this.state.summonerId) {
            this.setState({
              perks: participantObj.perks,
              perksArr: participantObj.perks.perkIds,
              perkStyle: participantObj.perks.perkStyle,
              perkSubStyle: participantObj.perks.perkSubStyle
            });
          }
        });

        this.state.perksArr.map(perkNumber => {
          for (let j = 0; j < 5; j++) {
            for (let m = 0; m < 4; m++) {
              for (let n = 0; n < 3; n++) {
                let detailsObj = {};
                if (this.state.data[j].slots[m].runes[n].id == perkNumber) {
                  detailsObj.link =
                    "https://ddragon.leagueoflegends.com/cdn/img/perk-images/" +
                    this.state.data[j].slots[m].runes[n].icon.substring(12);
                  detailsObj.description = this.state.data[j].slots[m].runes[
                    n
                  ].shortDesc;
                  console.log(this.state.data[j].slots[m].runes[n].shortDesc);
                  this.runeDetailsArray.push(detailsObj);
                }
              }
            }
          }
        });

        this.setState({
          runeDetailsArr: this.runeDetailsArray
        });
      });
    });
  }

  //Loading summoner details
  loadData() {
    const url =
      "https://corsproxy2213.herokuapp.com/?q=https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      "ProUske" +
      "?api_key=RGAPI-7556685b-5b8f-42dc-a5c4-3cb41c0328d2";
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open("GET", url);

      req.onload = function() {
        if (req.status === 200) {
          console.log(req.response);
          document.getElementById("root").style.display = "block";
          resolve(req.response);
        } else {
          console.log("req failed");
          reject(
            alert(
              "The summoner you serached for doesn't appear to be in a game"
            )
          );
        }
      };
      req.send();
    });
  }

  //Loading in game data
  loadIngameData(val) {
    const url =
      "https://corsproxy2213.herokuapp.com/?q=https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" +
      val +
      "?api_key=RGAPI-7556685b-5b8f-42dc-a5c4-3cb41c0328d2";
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open("GET", url);

      req.onload = function() {
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject(
            alert(
              "The summoner you serached for doesn't appear to be in a game"
            )
          );
        }
      };
      req.send();
    });
  }

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClick}
          style={{ marginBottom: "5px" }}
        >
          Reload Runes
        </Button>
        <RuneList runeDetailsArr={this.state.runeDetailsArr}></RuneList>
      </div>
    );
  }
}

export default RuneOverview;
