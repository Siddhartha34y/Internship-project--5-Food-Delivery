import React from 'react'
import './ExpolerMenu.css'
import { menu_list } from '../../assets/assets'

const ExpolerMenu = ({category,setCategory}) => {
  return (
    <div className='expoler-menu' id='expoler-menu'>
        <h1>Discover the flavors we offer—Explore Our Menu!</h1>
        <p className='expoler-menu-text'>Savor the finest culinary creations with our diverse menu, where every dish is a masterpiece crafted from premium ingredients and culinary passion.  Come hungry, leave delighted!</p>
         <div className="expoler-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index}className='expoler-menu-list-item'>
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                    </div>
                )
            })}
         </div>
         <hr />
    </div>
  )
}

export default ExpolerMenu