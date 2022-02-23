import React from 'react';
import { useHistory } from 'react-router-dom';
import image1 from '../../assets/img/bigimage2.jpg'
export default function Details() {
 let history=useHistory()

  return(
      <div>
          <div className='post_div'>
          <div className='details_comp'>
              <div><img src={image1} style={{width:"90px",height:"90px",borderRadius:"50%"}}/>
              <div className='detai_div' style={{padding:"10px 0px"}}><label>Jhon Due </label><label>11-02-1990</label></div></div>
              <div><label>56</label><label>Posts</label></div>
              <div onClick={()=>history.push("/farmer-followers")}><label>678</label><label>Followers</label></div>
              <div onClick={()=>history.push("/farmer-followers")}><label>234</label><label>Following</label></div>
          </div>
          </div>
         
          <div className='edit_pro'>
              <label onClick={()=>history.push("/vendor/vendor-profile")}>Edit Profile</label><label><i class="fa fa-user"></i></label>
          </div>

      </div>
  );
}
