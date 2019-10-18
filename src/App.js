import React from "react";
import jikanjs from "jikanjs";

class App extends React.Component {

    tmpl(anime){
        const {image_url, title, mal_id, type} = anime

        return (
            <div id={mal_id} key={mal_id}>
                <figure>
                    <span>{type}</span>
                    <img src={image_url} alt={title} />
                    <p>{title}</p>
                </figure>
            </div>
        )

    }

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
