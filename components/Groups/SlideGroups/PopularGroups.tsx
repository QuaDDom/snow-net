import axios from 'axios';
import React, { useState } from 'react'
import Slider from 'react-slick';

let settings = {
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2
};

export default function PopularGroups() {
    const [groups, setGroups] = useState<any>([])

    const fetchGroups =  async ()=>{
        try{
            const groupsData = await axios.get('');
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className="slideContainer">
            <h3 className="title">Popular Groups</h3>
            <Slider {...settings}>
                {

                }
            </Slider>
        </div>
    )
}
