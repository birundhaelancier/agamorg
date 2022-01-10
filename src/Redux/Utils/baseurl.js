export const apiurl = "https://myv3ads.com/plm/"

export const findServer = (userType) => {
    if(userType=='BM' || userType=='SM' || userType=='SP' || userType=='OM'){
        return 'https://myv3ads.com/plm/';
    } else if(userType=='GM' || userType=='DM' ||userType=='CM'){
        return 'https://myv3ads.com/plmNew/';
    }
};