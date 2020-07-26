module.exports = function (sequelize, DataTypes) {
  return sequelize.define("reviews", {
    // I think i pull in the data of the episode or movie from the controller, however we want that tied to it automagically from here
    // name of film:
    // ~ episode if it's a tv show
    reviewerid: DataTypes.INTEGER,
    reviewerName: DataTypes.STRING,
    review: DataTypes.STRING,
    characterImage: DataTypes.STRING,
    characterName: DataTypes.STRING,
    characterGender: DataTypes.STRING,
    characterSpecies: DataTypes.STRING,
    characterStatus: DataTypes.STRING,
  });
};

// Hold onto the episode or json data you need from one api into the localstorage and pass it on through the component
