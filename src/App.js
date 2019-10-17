import React from "react";
import jikanjs from "jikanjs";

class App extends React.Component {
    render() {
        jikanjs
        .loadSeasonLater()
        .then((response) => {
            response.anime.forEach(element => {
                console.log(`${element.mal_id}: ${element.title} - ${element.image_url} - ${element.type}`);
            })
        }).catch((err) => {
            console.error(err); // in case a error happens
        });

        return <h1> Hello World :) </h1>;
    }
}


export default App;
