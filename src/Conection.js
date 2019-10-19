
const Conection = () => {

    return fetch('GET', 'https://api.jikan.moe/v3/season/later')
    .then(res => res.json())

    // request.onreadystatechange = function () {
    //     if (this.readyState === 4) {
    //         return this.responseText
    //         // console.log('Status:', this.status);
    //         // console.log('Headers:', this.getAllResponseHeaders());
    //         // console.log('Body:', this.responseText);
    //     }
    // };

    // request.send();
}

export default Conection
