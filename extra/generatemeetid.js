export function generateMeetid(max_length){
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var id = ""
    for (var i = 0; i < max_length; i++){
        id += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return id
}