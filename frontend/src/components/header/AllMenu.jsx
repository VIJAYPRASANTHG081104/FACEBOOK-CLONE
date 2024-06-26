import React from "react";
import AllMenuItem from "./AllMenuItem";
import {menu,create} from "../../data/allMenu"

const AllMenu = () => {
  return (
    <div className="all_menu">
      <div className="all_menu_header">Menu</div>
      <div className="all_menu_wrap scrollbar">
        <div className="all_left">
          <div className="all_menu_search">
            <i className="amm_s_ic"></i>
            <input type="text" placeholder="Search Menu" />
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Social</div>
            {
                menu.slice(0,6).map((item,index)=>{
                    return(
                        <AllMenuItem key={index} name={item.name} description={item.description} icon={item.icon}/>
                    )
                })
            }
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Entertainmet</div>
            {
                menu.slice(6,9).map((item,index)=>{
                    return(
                        <AllMenuItem key={index} name={item.name} description={item.description} icon={item.icon}/>
                    )
                })
            }
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Shopping</div>
            {
                menu.slice(9,11).map((item,index)=>{
                    return(
                        <AllMenuItem key={index} name={item.name} description={item.description} icon={item.icon}/>
                    )
                })
            }
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Personal</div>
            {
                menu.slice(11,15).map((item,index)=>{
                    return(
                        <AllMenuItem key={index} name={item.name} description={item.description} icon={item.icon}/>
                    )
                })
            }
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Professional</div>
            {
                menu.slice(15,17).map((item,index)=>{
                    return(
                        <AllMenuItem key={index} name={item.name} description={item.description} icon={item.icon}/>
                    )
                })
            }
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Community Resource</div>
            {
                menu.slice(17,21).map((item,index)=>{
                    return(
                        <AllMenuItem key={index} name={item.name} description={item.description} icon={item.icon}/>
                    )
                })
            }
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">More from Meta</div>
            {
                menu.slice(21,23).map((item,index)=>{
                    return(
                        <AllMenuItem key={index} name={item.name} description={item.description} icon={item.icon}/>
                    )
                })
            }
          </div>
          

        </div>
        <div className="all_right">
            <div className="all_right_header">Create</div>
            {
                create.map((item)=>{
                    return(
                        <div className="all_right_item hover1">
                            <div className="all_right_circle">
                                <i className={item.icon}></i>
                            </div>
                            {item.name}
                        </div>
                    )
                })
            }
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
