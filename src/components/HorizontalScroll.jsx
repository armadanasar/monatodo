import React from 'react'
import './HorizontalScroll.css'
const images = ["https://pomona-images.s3-ap-southeast-1.amazonaws.com/production/campaigns/1578046257878_ntqiZk3i8ecHmMvl.jpeg", "https://pomona-images.s3-ap-southeast-1.amazonaws.com/production/campaigns/1578036763416_ReFfoDqgPSUnvPkX.jpeg", "https://pomona-images.s3-ap-southeast-1.amazonaws.com/production/campaigns/1574741592996_hPt6TSqNTwwblRDS.jpeg"]


function HorizontalScroll() {
    return <div className="horizontalScroll">
        {images.map(image => <img src={image}/>)}
    </div>
}

export default HorizontalScroll