
const Friend = require("../models/friendSchema")

const friendUserids = async(identityUserId) => {
    try{

        let friends = await Friend.find({"user": identityUserId , "confirmed": true}).select({"friend": 1, "_id": 0}).populate("friend")
        let friends2 = await Friend.find({"friend": identityUserId, "confirmed": true}).select({"user": 1, "_id": 0}).populate("user")
        
        ////console.log(friends)
        let friendsClean = [];

        friends.forEach(friends => {
            friendsClean.push(friends.friend)
        })

        friends2.forEach(friends => {
            friendsClean.push(friends.user)
        })


        return {
            friends: friendsClean
        }
    }catch(error){

        return {}
    }
    
}

const friendThisUser = async(identityUserId, profileUserId) => {
    

    let friend = await Friend.find({$or:[{"user": identityUserId ,"friend": profileUserId, "confirmed": true},{"user": profileUserId ,"friend": identityUserId, "confirmed": true}]})
    if(friend.length != 0){
        return{friend}
    }

    return {}
}








module.exports = {

    friendUserids,
    friendThisUser
    

}