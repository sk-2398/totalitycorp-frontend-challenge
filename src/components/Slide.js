import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { styled,Box,Typography, Button} from '@mui/material';
import{Link} from 'react-router-dom';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Component=styled(Box)`
    max-width:1500px;
    background:#ffffff;
    margin-left:auto;
    margin-right:auto;
    margin-top:100px;
    margin-bottom:100px;

`

const Deal=styled(Box)`
    padding:15px 20px;
    display:flex;
    margin-bottom:20px;
`


const DealText=styled(Typography)`
    font-size:22px;
    font-weight:600;
    margin-right:25px;
    line-height:32px;
`

const ViewAllBtn=styled(Button)`
    margin-left:auto;
    background:#2874f0;
    border-radius:2px;
    font-size:13px;
    font-weight:600;

`
function Slide({products}) {
   
  return (
    <Component>
    <Deal>
        <DealText>Deal of the day</DealText>
        
        <ViewAllBtn variant="contained" color='primary'>VIEW ALL</ViewAllBtn>
    </Deal>
    <Carousel responsive={responsive}dotListClass="custom-dot-list-style"   itemClass="carousel-item-padding-40-px"
    containerClass="carousel-container" swipeable={true} draggable={true} infinite={true}
    autoPlay={true} autoPlaySpeed={4000} centerMode={true}>
      {
        products.map(product=>(
            <Link to={`/products/${product.id}`} className='s-product-link'><img src={product.image} className='s-product' alt={product.title} width={100} height={100} /></Link> 
        ))
      }
    </Carousel>
    </Component>
  )
}

export default Slide
