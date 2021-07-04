import { connect } from "react-redux";

const validate = (object, writeMovie, writeTV, NotifyError)=>{
    const{type} = object
    //writeMovie saves object as movie in the db
    //writeTV saves object as TV show in the db
    const{id, title, links} = object
    //console.log(links)
    if(!id || !parseInt(id) || `${id}`.length < 5 ){//checking if movie/tv id is valid
        NotifyError("Valid TMDB ID is required! Use Searchbox to automatically get ID.")
    }
    if(!title || title.length < 3){
        NotifyError("Invalid Title! Use Searchbox to automatically get title.")
    }
    if(!links.link || links.link.length < 10){
        NotifyError('Enter valid download link.')
    }
    else{
        switch (type) {
            case 'movie':
                writeMovie(object)
                break;
            case 'tv':
                writeTV(object)
                break;
            default:
                break;
        }
    }
}

export default validate