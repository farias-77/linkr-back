import { hashtagRepository } from "../repositories/hashtagRepositories.js";

export async function hashtagVerifier(text){
    const arrayHashtags = text.split(' ').filter(isHashtag);
    const {rows: hashtags} = await hashtagRepository.getAllHashtags();
    let idCounter = hashtags.length;
    let hashtagIdList = [];

    for(let i=0; i<arrayHashtags.length; i++){
        const hashtag = arrayHashtags[i].slice(1);
        const possibleHashtag = hashtags.find(hashtags => hashtags.hashtag == hashtag);
        
        if(possibleHashtag !== undefined){
            hashtagIdList.push(possibleHashtag.id);
        }
        else{
            idCounter++;
            await hashtagRepository.insertHashtag(hashtag);
            hashtagIdList.push(idCounter);
        }
    }
    return hashtagIdList;
}

function isHashtag(word){
    const index = word.indexOf("#");
    if(index === 0){
        return true;
    }
    else{
        return false;
    }
}