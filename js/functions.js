function sendreq(mob,pincode,blood_grp) {
    if(mob.length!=10)
        return 1;
    if(pincode.length!=6)
        return 2;
    axios.post('/api/request', {
        "phone":mob,
        "pincode":pincode,
        "group":blood_grp
    }).then(function(response) {
        console.log(response);        
    }).catch(function(response) {
        console.log(response);        
    });
}
function register(mob,fam_id,blood_grp) {
    blood_grp = blood_grp.toUpperCase();
    axios.post("/api/register", {
        "phone":mob,
        "family_id":fam_id,
        "group":blood_grp
    }).then(function(response) {
        console.log(response);        
    }).catch(function(response) {
        console.log(response);        
    });
}
function update_status(mob,new_status) {
    axios.post("/api/update", {
        "phone":mob,
        "status":new_status
    }).then(function(response) {
        console.log(response);        
    }).catch(function(response) {
        console.log(response);        
    });
}
function num_to_grp(num) {
    switch(blood_grp) {
        case 1:
            grp = "A+";break;
        case 2:
            grp = "B+";break;
        case 3:
            grp = "AB+";break;
        case 4:
            grp = "O+";break;
        case 5:
            grp = "A-";break;
        case 6:
            grp = "B-";break;
        case 7:
            grp = "AB-";break;
        case 8:
            grp = "O-";break;
        default:
         return 0;
    }
    return grp;
}