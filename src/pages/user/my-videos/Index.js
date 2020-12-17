import React, { useEffect, useState } from 'react'
import axios from 'axios'
import url from '../../../utils/url'

import Navbar from '../../../components/UserNavbar/Index'
import VideoList from '../../../components/VideoList/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'

const Index = () => {
    const [isLoading, setLoading] = useState(false)
    const [videos, setVideos] = useState([])
    const id = localStorage.getItem('id')

    const header = {
        headers:
        {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    useEffect(() => {
        // Fetch Random videos
        const fetchRandomVideos = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${url}user/my/videos/${id}`, header)
                setVideos(response.data.videos)
                setLoading(false)
            } catch (error) {
                if (error) {
                    setLoading(false)
                }
            }
        }

        fetchRandomVideos()
    }, [])

    return (
        <div>
            <Navbar
                title={'My videos'}
                back={true}
            />

            {isLoading ? <LoadingComponent /> :
                <div className="container">
                    <div className="row">
                        {videos && videos.length > 0 ?
                            < div className="col-12 px-1">
                                <VideoList videos={videos} />
                            </div>
                            :
                            <div className="col-12 p-4">
                                <FourOFourComponent />
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Index;